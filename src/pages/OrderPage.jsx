import { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button, FormFeedback } from "reactstrap";

export default function OrderPage () {

    const pizzaPrice = 85.5;
    const extras = ["Pepperoni","Sosis","Kanada Jambonu","Tavuk Izgara","Soğan","Domates","Mısır","Sucuk","Jalepeno","Sarımsak","Biber","Maydonoz","Ananas","Kabak"] ;

    const [ formData, setFormData ] = useState({
        name:"",
        size:"",
        dough:"",
        selectedExtras:[],
        note:"",
        quantity:1,
    });

    const [ selecteds, setSelecteds ] = useState(0);
    const [ totalPrice, setTotalPrice ] = useState(0);

    const [ isValid, setIsValid ] = useState(false);
    const [ errors, setErrors] = useState({
        nameError:"",
        sizeError:"",
        doughError:"",
        selectedExtrasError:"",
    })
    
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
    
    /*Seçimler */
    useEffect(()=>{
        setSelecteds(formData.selectedExtras.length * 5)
    },[formData.selectedExtras]);

    const decreaseQuantity = () => {
        setFormData({...formData,quantity: formData.quantity >1 ? formData.quantity - 1 : 1 })
    }
    const increaseQuantity = () => {
        setFormData({...formData,quantity: formData.quantity + 1 })
    }
    
    /* Toplam tutar */
    useEffect(()=>{
        setTotalPrice(formData.quantity*(selecteds+pizzaPrice))
    },[formData.quantity,selecteds])
    
    /*validasyon*/
    useEffect(()=>{
        const validName = formData.name.trim().length > 3;
        const validSize = formData.size !== "";
        const validDough = formData.dough !== "";
        const validSelectedExtras = formData.selectedExtras.length <= 10 && formData.selectedExtras.length >= 4;

        setErrors({
            nameError: validName ? "" : "Lütfen en az 3 karakterden oluşan bir isim giriniz.",
            sizeError: validSize ? "" : "Boyut seçmelisiniz.",
            doughError: validDough ? "" : "Hamur seçmelisiniz.",
            selectedExtrasError: validSelectedExtras ? "" : "Lütfen en az 4 en fazla 10 malzeme seçiniz."
        })
         setIsValid(validName && validSize && validDough && validSelectedExtras);
    },[formData])

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
                    {errors.sizeError && (
                        <FormFeedback style={{ display: "block" }}>
                        {errors.sizeError}
                        </FormFeedback>)}
                </FormGroup>

                {/* Hamur Seç */}
                <FormGroup>
                    <Label htmlFor="dough">Hamur Seç <span style={{ color: "red", fontWeight: "bold" }}>*</span></Label>
                    <Input id="dough" name="dough" type="select" value={formData.dough} onChange={handleChange}>
                        <option value="" disabled>Hamur Kalınlığı</option>
                        <option value="thin">İnce Hamur</option>
                        <option value="extra-thin">Extra İnce Hamur</option>
                        <option value="standard">Standart Hamur</option>
                        <option value="thick">Kalın Hamur</option>
                        <option value="extra-thick">Extra Kalın Hamur</option>
                    </Input>
                    {errors.doughError && (
                        <FormFeedback style={{ display: "block" }}>
                        {errors.doughError}
                        </FormFeedback>)}
                </FormGroup>

                {/* Ek Malzemeler */}
                <FormGroup>
                    <Label>Ek Malzemeler</Label>
                    <p>En fazla 10 adet seçebilirsiniz. 5₺</p>
                    {extras.map((e, index) => (
                        <FormGroup check key={index}>
                            <Input 
                            type="checkbox" 
                            name="extras" 
                            value={e} 
                            id={`extra-${index}`} 
                            checked={formData.selectedExtras.includes(e)} 
                            onChange={handleChange} 
                            disabled={!formData.selectedExtras.includes(e) && formData.selectedExtras.length >= 10}/>
                            <Label check htmlFor={`extra-${index}`}>{e}</Label>
                        </FormGroup>
                        ))}
                    {errors.selectedExtrasError && (
                        <FormFeedback style={{ display: "block" }}>
                        {errors.selectedExtrasError}
                        </FormFeedback>)}
                </FormGroup>
                
                {/*İsim alanı */}
                <FormGroup>
                    <Label htmlFor="name">İsim</Label>
                    <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} invalid={errors.nameError}></Input>
                     <FormFeedback>{errors.nameError}</FormFeedback>
                </FormGroup>

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

                    <Button style={{backgroundColor:"#FDC913", color:"#292929", border:"none",fontWeight:"bold"}} type="submit" disabled={!isValid}>
                        Sipariş Ver
                    </Button>
                </FormGroup>
            </Form>
            <hr />
        </>
    )
}