import { fuego, useCollection } from '@nandorojo/swr-firestore';
import LoadingPage from 'components/LoadingPage';
import Navbar from 'components/Navbar';
import {
    motion,
    useAnimation,
    useMotionValue,
    useTransform,
} from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FunctionComponent, useEffect } from 'react';
import { usePalette } from 'react-palette';
import { Header } from 'semantic-ui-react';
import styles from 'styles/Home.module.scss';
import getContrast from 'utils/getContrast';
import { Offer } from 'utils/interfaces';
import { useUser } from 'utils/useUser';
import useWindowSize from 'utils/useWindowSize';

interface ProductCardProps extends Offer {
    onSwipe: (gesture: string) => void;
}

const ProductCard: FunctionComponent<ProductCardProps> = (props) => {
    const { data: imageColors } = usePalette(props.imageUrl);
    const x = useMotionValue(0);
    const controls = useAnimation();
    const scale = useTransform(x, (value) => -Math.abs(value) / 500 + 1);

    const detectSwipeGesture = (velocity: { x: number; y: number }) =>
        velocity.x > 0 ? 'right' : 'left';

    const threshold = 10;

    const hasSwiped = (velocity: { x: number; y: number }) =>
        Math.abs(velocity.x) > threshold;

    const onSwipe = async ({
        velocity,
    }: {
        velocity: { x: number; y: number };
    }) => {
        if (hasSwiped(velocity)) {
            const gesture = detectSwipeGesture(velocity);
            await controls.start(gesture, { duration: 0.3 });
            props.onSwipe(gesture);
        }
    };

    const [width] = useWindowSize();

    useEffect(() => {
        (async () => {
            try {
                await fuego.storage();
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    return (
        <motion.div
            style={{
                background: imageColors.darkVibrant,
                scale,
                x,
                color: getContrast(imageColors.darkVibrant || '#fff'),
            }}
            className={styles['product-container']}
            drag='x'
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_e, info) => onSwipe(info)}
            animate={controls}
            variants={{
                left: { x: -width, opacity: 0 },
                right: { x: width, opacity: 0 },
            }}
        >
            <Header
                style={{
                    color: getContrast(imageColors.darkVibrant || '#fff'),
                }}
                className={styles['product-header']}
            >
                {props.title}
            </Header>
            <Image
                className={styles['product-image']}
                layout='responsive'
                width={600}
                height={600}
                src={props.imageUrl}
                alt='Example'
            />
            <p className={styles['product-price']}>
                Price: <span>${props.price / 100}</span>
            </p>
        </motion.div>
    );
};

const Home: FunctionComponent = () => {
    const router = useRouter();

    const { status } = useUser();
    const { data: offers, mutate } = useCollection<Offer>(
        'offers',
        {
            where: ['status', '==', 'active'],
            limit: 3,
            ignoreFirestoreDocumentSnapshotField: false,
        },
        {
            revalidateOnFocus: false,
            refreshWhenHidden: false,
            refreshWhenOffline: false,
            refreshInterval: 0,
        }
    );

    const paginate = async () => {
        if (!offers?.length) return;
        const ref = fuego.db.collection('offers');

        const startAfterDocument = offers[offers.length - 1].__snapshot;

        type QuerySnapshot = firebase.default.firestore.QuerySnapshot;

        const nextDoc = await ref
            .where('status', '==', 'active')
            .startAfter(startAfterDocument)
            .limit(1)
            .get()
            .then((d: QuerySnapshot) => {
                const doc = d.docs[0];
                if (!doc) return null;
                return { ...doc.data(), id: doc.id, __snapshot: doc };
            });

        mutate(
            nextDoc ? [...offers.slice(1), nextDoc] : [...offers.slice(1)],
            false
        );
    };

    useEffect(() => {
        if (status === 'loggedout') {
            router.push('/');
        }
    }, [status]);

    if (status === 'wait') {
        return <LoadingPage />;
    }

    return (
        <>
            <Head>
                <title>Home - Saturn</title>
            </Head>
            <Navbar />
            <div className={styles['container']}>
                {offers
                    ?.slice()
                    ?.reverse()
                    ?.map((offer) => (
                        <ProductCard
                            {...offer}
                            onSwipe={paginate}
                            key={offer.id}
                        />
                    ))}
            </div>
        </>
    );
};

export default Home;
