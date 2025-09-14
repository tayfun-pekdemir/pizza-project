import TotalPriceBox from "../components/TotalPriceBox";

export default function SuccessPage({ order }) {
    return (
        <div className="success-page">
            <img src="../images/iteration-1-images/logo.svg" alt="Logo" />
            <h3 className="decorativeHeading">lezzetin yolda</h3>
            <h2><strong>SİPARİŞ ALINDI</strong></h2>
            <hr />
            <h2 className="product-name">{order?.product}</h2>
            <div className="order-summary">
                <div className="order-summary-info">
                <p>Boyut: <strong>{order?.size}</strong></p>
                <p>Hamur: <strong>{order?.dough}</strong></p>
                <p>Ek Malzemeler: <strong>{order?.selectedExtras.join(", ")}</strong></p>
                </div>
                <TotalPriceBox selecteds={order?.selecteds} totalPrice={order?.totalPrice} bgColor="#CE2829" color="#FAF7F2" border="1px solid #FAF7F2" width="100%" />
            </div>
        </div>
    )
}