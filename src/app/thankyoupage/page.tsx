export default function ThankYouPage() {
    return (
        <main className="p-10 text-center">
            <h1 className="text-4x1 font-bold mb-4">Order Successful!</h1>
            <p className="text-x1">Thank you for your purchase.</p>
            <a href="/" className="inline-block mt-8 bg-orange-500 text-white py-3 px-6 rounded-x1 hover:bg-gray-800">
                Continue Shopping
            </a>
        </main>
    )
}