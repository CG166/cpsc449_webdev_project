

type AddressCardProps = {
    //id: number,
    //userId: number,
    addressLine: string;
    country: string,
    state: string,
    city: string,
    zipcode: string;
};

export default function AddressDisplayCard({ addressLine, country, state, city, zipcode}: AddressCardProps) {
    const address = addressLine + ", " + city + ", " + state + " " + zipcode + ", " + country
    

    return (
        <main className="bg-white p-5">
            <h1 className="text-xl text-black">{address}</h1>
        </main>
    );

}