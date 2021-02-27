import { FunctionComponent } from 'react';
import { usePalette } from 'react-palette';
import { Header, Image } from 'semantic-ui-react';
import styles from 'styles/Cart.module.scss';
import getContrast from 'utils/getContrast';

interface Offer {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
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
            <Image
                className={styles['product-image']}
                layout='responsive'
                // width={600}
                // height={600}
                src={offer.imageUrl}
                alt='Example'
            />
            <p className={styles['product-price']}>
                Price: <span>${offer.price / 100}</span> <br />
                Amount: <span>{amount}</span> <br />
                Total: <span>${(offer.price * amount) / 100}</span>
            </p>
        </div>
    );
};

const Cart: FunctionComponent = () => {
    const cartItems: CartItemProps[] = [
        {
            offer: {
                id: '2cznxbObTAJByfaoDklV',
                title: 'Test',
                description: 'testtest',
                price: 2000,
                imageUrl:
                    'https://assets.ajio.com/medias/sys_master/root/20200923/zVxD/5f6a534d7cdb8c21e3698ec7/-1117Wx1400H-460550669-red-MODEL.jpg',
            },
            amount: 1,
        },
        {
            offer: {
                id: '3exuFO6pNvzqGnWO4QYA',
                title: 'Turluk',
                description: 'Neshto koeto bulgarite nosqt kato im e studeno',
                price: 199,
                imageUrl:
                    'https://assets.ajio.com/medias/sys_master/root/20200923/zVxD/5f6a534d7cdb8c21e3698ec7/-1117Wx1400H-460550669-red-MODEL.jpg',
            },
            amount: 2,
        },
        {
            offer: {
                id: 'O7WMQbgHfiakILPCNuaB',
                title: 'Obuvka',
                description: 'predmet s podmetka',
                price: 2000,
                imageUrl:
                    'https://assets.ajio.com/medias/sys_master/root/20200923/zVxD/5f6a534d7cdb8c21e3698ec7/-1117Wx1400H-460550669-red-MODEL.jpg',
            },
            amount: 1,
        },
    ];
    return (
        <div className={styles['container']}>
            {cartItems.map((item, i) => (
                <CartItem {...item} key={i} />
            ))}
        </div>
    );
};

export default Cart;
