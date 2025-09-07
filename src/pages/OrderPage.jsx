import { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button, FormFeedback } from "reactstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function OrderPage() {

    const pizzaPrice = 85.50
    const extras = ["Pepperoni", "Sosis", "Kanada Jambonu", "Tavuk Izgara", "Soğan", "Domates", "Mısır", "Sucuk", "Jalepeno", "Sarımsak", "Biber", "Maydonoz", "Ananas", "Kabak"];

    const history = useHistory();

    const [formData, setFormData] = useState({
        name: "",
        size: "",
        dough: "",
        selectedExtras: [],
        orderNote: "",
        quantity: 1,
    });

    const [selecteds, setSelecteds] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const [isValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState({
        nameError: "",
        sizeError: "",
        doughError: "",
        selectedExtrasError: "",
    })

    const handleChange = (event) => {
        let { type, name, checked, value } = event.target;

        if (type === "checkbox") {
            setFormData(
                { ...formData, selectedExtras: checked ? [...formData.selectedExtras, value] : formData.selectedExtras.filter((e) => e != value) }
            )
        } else {
            setFormData({ ...formData, [name]: value })
        }
    }

    /*Seçimler */
    useEffect(() => {
        setSelecteds(formData.selectedExtras.length * 5)
    }, [formData.selectedExtras]);

    const decreaseQuantity = () => {
        setFormData({ ...formData, quantity: formData.quantity > 1 ? formData.quantity - 1 : 1 })
    }
    const increaseQuantity = () => {
        setFormData({ ...formData, quantity: formData.quantity + 1 })
    }

    /* Toplam tutar */
    useEffect(() => {
        setTotalPrice(formData.quantity * (selecteds + pizzaPrice))
    }, [formData.quantity, selecteds])

    /*validasyon*/
    useEffect(() => {
        const validName = formData.name.trim().length >= 3;
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
    }, [formData])

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("https://reqres.in/api/pizza", formData, { headers: { "x-api-key": "reqres-free-v1" } })
            .then(response => {
                console.log(response.data)
                history.push("/success")
            })
            .catch(error => {
                console.error(error)
                alert("Sipariş gönderilemedi. Lütfen tekrar deneyin.")
            })
    }

    return (
        <main className="order-page">
            <header className="order-header">
                <img src="../images/iteration-1-images/logo.svg" alt="Logo" />
                <p className="direction-text">Anasayfa - <span className="direction-bold">Sipariş Oluştur</span></p>
            </header>
            <section className="order-container">
                <div className="order-detail">
                    <h2 className="form-heading">Position Absolute Acı Pizza</h2>
                    <div className="orderdetail-row">
                        <p className="order-price">{pizzaPrice.toFixed(2)}₺</p><span className="rating">4.9</span> <span className="comments-count">(200)</span>
                    </div>
                    <p className="order-text">Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir.. Küçük bir pizzaya bazen pizzetta denir.</p>
                </div>

                <div className="form-wrapper">

                    <Form onSubmit={handleSubmit} className="order-form">

                        <div className="form-rowgroup">
                            {/* Pizza Boyutu */}
                            <FormGroup className="size-section">
                                <Label className="form-heading">Boyut Seç <span className="required" >*</span></Label>
                                <FormGroup check>
                                    <Input type="radio" name="size" id="sizeSmall" value="small" checked={formData.size === "small"} onChange={handleChange} required />
                                    <Label check htmlFor="sizeSmall" className="order-text" >Küçük</Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Input type="radio" name="size" id="sizeMedium" value="medium" checked={formData.size === "medium"} onChange={handleChange} required />
                                    <Label check htmlFor="sizeMedium" className="order-text" >Orta</Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Input type="radio" name="size" id="sizeLarge" value="large" checked={formData.size === "large"} onChange={handleChange} required />
                                    <Label check htmlFor="sizeLarge" className="order-text" >Büyük</Label>
                                </FormGroup>
                                {errors.sizeError && (
                                    <FormFeedback style={{ display: "block" }}>
                                        {errors.sizeError}
                                    </FormFeedback>)}
                            </FormGroup>

                            {/* Hamur Seç */}
                            <FormGroup className="dough-section">
                                <Label className="form-heading" htmlFor="dough">Hamur Seç <span className="required" >*</span></Label>
                                <Input id="dough" name="dough" type="select" value={formData.dough} onChange={handleChange} required>
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
                        </div>

                        {/* Ek Malzemeler */}
                        <FormGroup className="extras-section">
                            <div className="extras-heading">
                                <Label className="form-heading">Ek Malzemeler</Label>
                                <p className="order-text" >En fazla 10 adet seçebilirsiniz. 5₺</p>
                            </div>
                            <div className="extras-container">
                                {extras.map((e, index) => (
                                    <FormGroup className="form-checkbox" key={index}>
                                        <Input
                                            type="checkbox"
                                            name="extras"
                                            value={e}
                                            id={`extra-${index}`}
                                            checked={formData.selectedExtras.includes(e)}
                                            onChange={handleChange}
                                            disabled={!formData.selectedExtras.includes(e) && formData.selectedExtras.length >= 10} />
                                        <Label check htmlFor={`extra-${index}`}>{e}</Label>
                                    </FormGroup>
                                ))}
                            </div>
                            {errors.selectedExtrasError && (
                                <FormFeedback style={{ display: "block" }}>
                                    {errors.selectedExtrasError}
                                </FormFeedback>)}
                        </FormGroup>

                        {/*İsim alanı */}
                        <FormGroup className="name-input">
                            <Label className="form-heading" htmlFor="name">İsim<span className="required" > *</span></Label>
                            <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} invalid={errors.nameError !== ""} required></Input>
                            <FormFeedback>{errors.nameError}</FormFeedback>
                        </FormGroup>

                        {/* Sipariş Notu */}
                        <FormGroup className="note-input">
                            <Label className="form-heading" htmlFor="orderNote">Sipariş Notu</Label>
                            <Input
                                id="orderNote"
                                name="orderNote"
                                type="textarea"
                                placeholder="Siparişine eklemek istediğin bir not var mı?"
                                value={formData.note}
                                onChange={handleChange}

                            />

                        </FormGroup>
                        <hr />
                        <div className="form-rowgroup">
                            {/* Adet Sayacı */}
                            <FormGroup className="quantity-container">
                                <Button className="dec-button" type="button" onClick={decreaseQuantity}>-</Button>
                                <Input
                                    id="quantity"
                                    name="quantity"
                                    className="quantity-input"
                                    type="text"
                                    value={formData.quantity}
                                    readOnly
                                />
                                <Button className="inc-button" type="button" onClick={increaseQuantity}>+</Button>
                            </FormGroup>
                            <div className="form-colgroup">
                                {/* Toplam Fiyat */}
                                <div className="totalprice-section">
                                    <FormGroup>
                                        <h3 className="form-heading">Sipariş Toplamı</h3>
                                        <div className="row-selecteds">
                                            <span className="selecteds-text">Seçimler</span>
                                            <span className="selecteds-price">{selecteds}₺</span>
                                        </div>
                                        <div className="row-total" >
                                            <span className="total-text">Toplam</span>
                                            <span className="total-price">{totalPrice.toFixed(2)}₺</span>
                                        </div>
                                    </FormGroup>
                                </div>
                                <Button className="submit-button" type="submit" disabled={!isValid}>
                                    SİPARİŞ VER
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </section>
        </main>
    )
}