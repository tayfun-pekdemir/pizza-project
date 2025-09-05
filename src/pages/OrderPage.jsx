import { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

export default function OrderPage () {

    const pizzaPrice = 85.5;
    const extras = ["Pepperoni","Sosis","Kanada Jambonu","Tavuk Izgara","Soğan","Domates","Mısır","Sucuk","Jalepeno","Sarımsak","Biber","Maydonoz","Ananas","Kabak"] ;

    const [ formData, setFormData ] = useState({
       size:"",
       dough:"",
       selectedExtras:[],
       note:"",
       quantity:1,
    });

    const [ selecteds, setSelecteds ] = useState(0);
    const [ totalPrice, setTotalPrice ] = useState(0);
    
    const handleChange = (event) => {
        let { type, name ,checked, value } = event.target;
        
        if(type==="checkbox"){
            setFormData(
                {...formData,selectedExtras: checked ? [...formData.selectedExtras, value]  : formData.selectedExtras.filter( (e) => e != value )}
            )
        } else {
            setFormData({...formData,[name]:value})
        }
    }

    useEffect(()=>{
        setSelecteds(formData.selectedExtras.length * 5)
    },[formData.selectedExtras]);

    const decreaseQuantity = () => {
        setFormData({...formData,quantity: formData.quantity >1 ? formData.quantity - 1 : 1 })
    }
    const increaseQuantity = () => {
        setFormData({...formData,quantity: formData.quantity + 1 })
    }

    useEffect(()=>{
        setTotalPrice(formData.quantity*(selecteds+pizzaPrice))
    },[formData.quantity,selecteds])

    return(
        
        <>
            <h2>{pizzaPrice}₺</h2>
            <Form>
                {/* Pizza Boyutu */}
                <FormGroup>
                    <Label>Boyut Seç <span style={{ color: "red", fontWeight: "bold" }}>*</span></Label>
                    <FormGroup check>
                        <Input type="radio" name="size" id="sizeSmall" value="small" checked = {formData.size==="small"} onChange={handleChange}/>
                        <Label check htmlFor="sizeSmall">Küçük</Label>
                    </FormGroup>
                    <FormGroup check>
                        <Input type="radio" name="size" id="sizeMedium" value="medium" checked = {formData.size==="medium"} onChange={handleChange}/>
                        <Label check htmlFor="sizeMedium">Orta</Label>
                    </FormGroup>
                    <FormGroup check>
                        <Input type="radio" name="size" id="sizeLarge" value="large" checked = {formData.size==="large"} onChange={handleChange}/>
                        <Label check htmlFor="sizeLarge">Büyük</Label>
                    </FormGroup>
                </FormGroup>

                {/* Hamur Seç */}
                <FormGroup>
                    <Label htmlFor="dough">Hamur Seç <span style={{ color: "red", fontWeight: "bold" }}>*</span></Label>
                    <Input id="dough" name="dough" type="select" value={formData.dough} onChange={handleChange}>
                        <option value="thin">İnce Hamur</option>
                        <option value="extra-thin">Extra İnce Hamur</option>
                        <option value="standard">Standart Hamur</option>
                        <option value="thick">Kalın Hamur</option>
                        <option value="extra-thick">Extra Kalın Hamur</option>
                    </Input>
                </FormGroup>

                {/* Ek Malzemeler */}
                <Label>Ek Malzemeler</Label>
                <p>En fazla 10 adet seçebilirsiniz. 5₺</p>
                {extras.map((e, index) => (
                    <FormGroup check key={index}>
                        <Input type="checkbox" name="extras" value={e} id={`extra-${index}`} checked={formData.selectedExtras.includes(e)} onChange={handleChange}/>
                        <Label check htmlFor={`extra-${index}`}>{e}</Label>
                    </FormGroup>
                    ))}
                

                {/* Sipariş Notu */}
                <FormGroup>
                    <Label htmlFor="orderNote">Sipariş Notu</Label>
                    <Input
                    id="orderNote"
                    name="orderNote"
                    type="textarea"
                    placeholder="Siparişine eklemek istediğin bir not var mı?"
                    value={formData.note}
                    onChange={handleChange}/>
                </FormGroup>

                {/* Adet Sayacı */}
                <FormGroup>
                    <div className="quantity-container" style={{ display: "flex", alignItems: "center", gap: "0" }}>
                        <Button style={{backgroundColor:"#FDC913", color:"#292929"}} type="button" onClick={decreaseQuantity}>-</Button>
                        <Input
                        id="quantity"
                        name="quantity"
                        type="text"
                        value={formData.quantity}
                        readOnly
                        style={{ width: "2rem", textAlign: "center" }}
                        />
                        <Button style={{backgroundColor:"#FDC913", color:"#292929"}} type="button" onClick={increaseQuantity}>+</Button>
                    </div>
                </FormGroup>

                {/* Toplam Fiyat */}
                <FormGroup>
                <div className="total-price" style={{border:"1px solid #FAF7F2"}}>
                    <h2>Sipariş Toplamı</h2>
                    <p>Seçimler</p> <p> {selecteds}₺ </p>
                    <p>Toplam</p> <p> {totalPrice}₺ </p>
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