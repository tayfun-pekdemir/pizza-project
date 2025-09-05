import { Form, FormGroup, Label, Input, Button } from "reactstrap";

export default function OrderPage () {
    return(
        <>
            <Form>
                {/* Pizza Boyutu */}
                <FormGroup>
                    <Label>Boyut Seç <span style={{ color: "red", fontWeight: "bold" }}>*</span></Label>
                    <FormGroup check>
                        <Input type="radio" name="size" id="sizeSmall" value="small" />
                        <Label check htmlFor="sizeSmall">Küçük</Label>
                    </FormGroup>
                    <FormGroup check>
                        <Input type="radio" name="size" id="sizeMedium" value="medium" />
                        <Label check htmlFor="sizeMedium">Orta</Label>
                    </FormGroup>
                    <FormGroup check>
                        <Input type="radio" name="size" id="sizeLarge" value="large" />
                        <Label check htmlFor="sizeLarge">Büyük</Label>
                    </FormGroup>
                </FormGroup>

                {/* Hamur Seç */}
                <FormGroup>
                    <Label htmlFor="dough">Hamur Seç <span style={{ color: "red", fontWeight: "bold" }}>*</span></Label>
                    <Input id="dough" name="dough" type="select">
                        <option value="thin">İnce Hamur</option>
                        <option value="extra-thin">Extra İnce Hamur</option>
                        <option value="standard">Standart Hamur</option>
                        <option value="thick">Kalın Hamur</option>
                        <option value="extra-thick">Extra Kalın Hamur</option>
                    </Input>
                </FormGroup>

                {/* Ek Malzemeler */}
                <FormGroup>
                    <Label>Ek Malzemeler</Label>
                    <p>En fazla 10 adet seçebilirsiniz. 5₺</p>
                {/* Checkbox'lar buraya gelecek. */}
                </FormGroup>

                {/* Sipariş Notu */}
                <FormGroup>
                    <Label htmlFor="orderNote">Sipariş Notu</Label>
                    <Input
                    id="orderNote"
                    name="orderNote"
                    type="textarea"
                    placeholder="Siparişine eklemek istediğin bir not var mı?"
                    />
                </FormGroup>

                {/* Adet Sayacı */}
                <FormGroup>
                    <div className="quantity-container" style={{ display: "flex", alignItems: "center", gap: "0" }}>
                        <Button style={{backgroundColor:"#FDC913", color:"#292929"}} type="button">-</Button>
                        <input
                        id="quantity"
                        name="quantity"
                        type="text"
                        readOnly
                        style={{ width: "2rem", textAlign: "center" }}
                        />
                        <Button style={{backgroundColor:"#FDC913", color:"#292929"}} type="button">+</Button>
                    </div>
                </FormGroup>

                {/* Toplam Fiyat */}
                <FormGroup>
                <div className="total-price" style={{border:"1px solid #FAF7F2"}}>
                    <h2>Sipariş Toplamı</h2>
                    <p>Seçimler</p> <p>25</p>
                    <p>Toplam</p> <p>110</p>
                </div>

                <Button style={{backgroundColor:"#FDC913", color:"#292929", border:"none",fontWeight:"bold"}} type="submit">
                    Sipariş Ver
                </Button>
                </FormGroup>
            </Form>
            <hr />
        </>
    )
}