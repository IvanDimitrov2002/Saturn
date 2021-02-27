import { fuego, useCollection } from '@nandorojo/swr-firestore';
import LoadingPage from 'components/LoadingPage';
import Navbar from 'components/Navbar';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FunctionComponent, useEffect, useState } from 'react';
import { usePalette } from 'react-palette';
import { Header, Image } from 'semantic-ui-react';
import styles from 'styles/Cart.module.scss';
import getContrast from 'utils/getContrast';
import { useUser } from 'utils/useUser';

interface Offer {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    get: () => Promise<Offer>;
    data: () => Offer;
}

interface CartItemProps {
    offer: Offer;
    amount: number;
}

const CartItem: FunctionComponent<CartItemProps> = ({ offer, amount }) => {
    const { data: imageColors } = usePalette(offer.imageUrl);

    return (
        <div
            className={styles['product-container']}
            style={{
                backgroundColor: imageColors.darkVibrant,
                color: getContrast(imageColors.darkVibrant || '#fff'),
            }}
        >
            <Header
                className={styles['product-header']}
                style={{
                    color: getContrast(imageColors.darkVibrant || '#fff'),
                }}
            >
                {offer.title}
            </Header>
            <div className={styles['product-info']}>
                <Image
                    className={styles['product-image']}
                    layout='responsive'
                    width={100}
                    height={100}
                    src={offer.imageUrl}
                    alt='Example'
                />
                <p className={styles['product-price']}>
                    Price: <span>${offer.price / 100}</span> <br />
                    Amount: <span>{amount}</span> <br />
                    Total: <span>${(offer.price * amount) / 100}</span>
                </p>
            </div>
        </div>
    );
};

const Cart: FunctionComponent = () => {
    const router = useRouter();

    const { user, status } = useUser();
    const { data: offersData } = useCollection<CartItemProps>(
        user ? `users/${user.id}/cart` : null,
        { listen: true }
    );

    const [offers, setOffers] = useState<CartItemProps[]>([]);

    useEffect(() => {
        if (status === 'loggedout') {
            router.push('/');
        }
        (async () => {
            try {
                if (offersData) {
                    const temp: CartItemProps[] = [];
                    for (const offer of offersData) {
                        const tempOffer: Offer = await offer.offer.get();
                        const imagesRef = await fuego
                            .storage()
                            .ref()
                            .child(tempOffer.id)
                            .listAll();
                        const imageUrl = await imagesRef.items[0].getDownloadURL();
                        temp.push({
                            offer: { ...tempOffer.data(), imageUrl },
                            amount: offer.amount,
                        });
                    }
                    setOffers(temp);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, [offersData]);

    if (status === 'wait') {
        return <LoadingPage />;
    }

    return (
        <>
            <Head>
                <title>Cart - Saturn</title>
            </Head>
            <Navbar />
            <div className={styles['container']}>
                {offers?.map((item, i) => (
                    <CartItem {...item} key={i} />
                ))}
            </div>
        </>
    );
};

export default Cart;
