export default function TotalPriceBox({ selecteds, totalPrice, bgColor, color, border ,width}) {

    return (
        <div className="totalprice-box" style={{
            backgroundColor: bgColor,
            color: color,
            border: border,
            width: width
        }} >
            <h3 className="form-heading" >Sipariş Toplamı</h3>
            <div className="row-selecteds">
                <span className="selecteds-text" style={{
                    color: color
                }}
                >Seçimler</span>
                <span className="selecteds-price" style={{
                    color: color
                }}>{selecteds}₺</span>
            </div>
            <div className="row-total">
                <span className="total-text" style={{
                    color: color
                }}>Toplam</span>
                <span className="total-price" style={{
                    color: color
                }}>{totalPrice.toFixed(2)}₺</span>
            </div>
        </div>
    )
}