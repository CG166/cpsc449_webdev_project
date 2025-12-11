
type CardCardProps = {
    cardHolderName: string;
    cardNumber: string;
};

export default function CardDisplayCard({cardHolderName, cardNumber}: CardCardProps) {
        const last4 = cardNumber.slice(-4);

    return (
        <main className="bg-white p-5">
            <h1>{cardHolderName} - Card ending in ********{last4}</h1>
        </main>
    );

}