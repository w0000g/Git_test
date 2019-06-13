
//Базовый класс
class Product {
    constructor(protected id: number, public name: string, public price: number, public description: string, public inStock: number) {
        
    }

    //Инициализация карточки
    Init(): any {
        let h5 = document.createElement("h5");
        h5.setAttribute("class", "card-title");
        h5.innerHTML = this.name;

        let divprice = document.createElement("div");
        divprice.setAttribute("class", "col-6 p-0 text-primary font-weight-bold");
        divprice.innerHTML = this.price + " грн.";

        let divavail = document.createElement("div");
        if (this.IsAvailable()) {
            divavail.setAttribute("class", "col-6 p-0 text-right text-success");
            divavail.innerHTML = "Есть в наличии: " + this.inStock.toString()+ " экземпляров";
        }
        else {
            divavail.setAttribute("class", "col-6 p-0 text-right text-danger");
            divavail.innerHTML = "Нет в наличии";
        }

        let divrow = document.createElement("div");
        divrow.setAttribute("class", "row");
        divrow.appendChild(divprice);
        divrow.appendChild(divavail);

        let divcon = document.createElement("div");
        divcon.setAttribute("class", "container");
        divcon.appendChild(divrow);

        let p = document.createElement("p");
        p.setAttribute("class", "card-text");
        p.innerHTML = this.description;

        let a = document.createElement("a");
        a.setAttribute("id", this.id.toString());
        a.setAttribute("href", "#buyModal");
        a.setAttribute("class", "btn btn-primary");
        a.setAttribute("data-toggle", "modal");
        a.setAttribute("onclick", "WantBuy(this.id)");
        a.innerHTML = "Купить";

        let divfu = document.createElement("div");
        divfu.setAttribute("class", "card-footer");
        divfu.appendChild(a);

        let divcardb = document.createElement("div");
        divcardb.setAttribute("class", "card-body mh-100");
        divcardb.setAttribute("style", "height: 200px");
        divcardb.appendChild(h5);
        divcardb.appendChild(divcon);
        divcardb.appendChild(p);

        let divcard = document.createElement("div");
        divcard.setAttribute("class", "card");
        divcard.appendChild(divcardb);
        divcard.appendChild(divfu);

        let divcol = document.createElement("div");
        divcol.setAttribute("class", "col-md-6 col-xl-4 p-1");
        divcol.appendChild(divcard);

        return divcol;
    }

    //Добавление карточки в строку
    protected Embed(obj: any) {
        let prods = document.getElementById('rowts');
        prods.appendChild(obj);
    }

    //Определение есть ли товар в наличии
	IsAvailable(): boolean {
        return (this.inStock > 0) ? true : false;
    }
}

//Перечисление доступных цветов
enum Color { Black = "Чёрный", Gray = "Серый", Pink = "Розовый" };
enum Country { USA = "USA", China = "Китай", Ukr = "Украина" };
interface Shoes {
    dimension: number; //размер
    color: Color; //цвет
    quantity: number; //количество
}

//Класс со сложными особенностями
class FeltBoots extends Product {
    isBigSizes: boolean; //Есть большие размеры
    haveColors: string[]; //Цвета которые есть
    constructor(protected id: number, public name: string, public price: number, public description: string, public inStock: number, public list?:Shoes[]) {
        super(id, name, price, description, inStock); 
        this.CalculateFlags();
        this.Init();
    }

    Init() {
        let obj = super.Init();
        
        //Если есть большие размеры, то добавляем информацию об этом в карточку
        if (this.isBigSizes) {
            let p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "Есть большие размеры";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }

        //Если есть информация о цвете, то добавляем её в карточку
        if (this.haveColors.length > 0) {
            let p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            let str = this.haveColors[0];
            for (let i = 1; i < this.haveColors.length; i++) {
                str += ", " + this.haveColors[i];
            }
            p.innerHTML = "Есть цвета: " + str;
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }

        this.Embed(obj);
    }

    //Вычисление сложных особенностей
    CalculateFlags() {
        //Поиск больших размеров
        this.isBigSizes = false;
        if (this.list != null)
            for (let i = 0; i < this.list.length; i++) 
                if (this.list[i].dimension > 43 && this.list[i].quantity > 0) {
                    this.isBigSizes = true;
                    break;
                }
        //Поиск доступных цветов
        let k = 0;
        this.haveColors = [];
        if (this.list != null)
            for (let i = 0; i < this.list.length; i++)
                if (this.haveColors.indexOf(this.list[i].color) == -1)
                    this.haveColors[k++] = this.list[i].color;
    }
}

interface Chair {
    isSoft: boolean; 
    color: Color; 
    quantity: number; 
}
interface Shoes1 {
    dimension: number; //размер
    color: Country; //цвет
    quantity: number; //количество
}

class FeltBoots1 extends Product {
    isBig2Sizes: boolean; //Есть большие размеры
    haveCountry: string[]; //Цвета которые есть
    constructor(protected id: number, public name: string, public price: number, public description: string, public inStock: number, public list?:Shoes1[]) {
        super(id, name, price, description, inStock); 
        this.CalculateFlags();
        this.Init();
    }

    Init() {
        let obj = super.Init();
        
        //Если есть большие размеры, то добавляем информацию об этом в карточку
        if (this.isBig2Sizes) {
            let p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "мягкие";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }

        //Если есть информация о цвете, то добавляем её в карточку
        if (this.haveCountry.length > 0) {
            let p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            let str = this.haveCountry[0];
            for (let i = 1; i < this.haveCountry.length; i++) {
                str += ", " + this.haveCountry[i];
            }
            p.innerHTML = "Есть страны: " + str;
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        if (document.getElementById('isBig2Sizes') == null && this.isBig2Sizes != null && this.isBig2Sizes) {
            let inp = document.createElement("input");
            inp.setAttribute("type", "checkbox");
            inp.setAttribute("id", "isBig2Sizes");
            inp.setAttribute("onclick", "CheckisBig2Sizes(this.checked)");

            let lab = document.createElement("p");
            lab.appendChild(inp);
            lab.innerHTML += "Только ручная работа<br>";

            let div = document.getElementById('myTools');
            div.appendChild(lab);
        }

        this.Embed(obj);
    }
        }


    //Вычисление сложных особенностей
    CalculateFlags() {
        //Поиск больших размеров
        this.isBig2Sizes = false;
        if (this.list != null)
            for (let i = 0; i < this.list.length; i++) 
                if (this.list[i].dimension > 43 && this.list[i].quantity > 0) {
                    this.isBig2Sizes = true;
                    break;
                }
        //Поиск доступных цветов
        let k = 0;
        this.haveCountry = [];
        if (this.list != null)
            for (let i = 0; i < this.list.length; i++)
                if (this.haveCountry.indexOf(this.list[i].color) == -1)
                    this.haveCountry[k++] = this.list[i].color;
    }
        
}

//Группировка по беспроводным наушникам
function CheckisBig2Sizes(flag: boolean) {
    document.getElementById('rowts').innerHTML = "";
    if (flag) {
        for (let i = 0; i < this.productList.length; i++)
            if (productList[i] instanceof FeltBoots1 && (<FeltBoots1>productList[i]).isBig2Sizes) (<FeltBoots1>productList[i]).Init();
    }
    else {
        for (let i = 0; i < this.productList.length; i++)
            productList[i].Init();
    }
}

interface Chair1 {
    isSoft: boolean; 
    color: Color; 
    quantity: number; 
}

class Pen extends Product {
    isSoft: boolean;
    haveColors: string[];
    constructor(protected id: number, public name: string, public price: number, public description: string, public inStock: number, public list?:Chair[]) {
        super(id, name, price, description, inStock); 
        this.CalculateFlags();
        this.Init();
    }

    Init() {
        let obj = super.Init();
        
        if (this.isSoft) {
            let p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "Ручная работа";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }

        if (this.haveColors.length > 0) {
            let p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            let str = this.haveColors[0];
            for (let i = 1; i < this.haveColors.length; i++) {
                str += ", " + this.haveColors[i];
            }
            p.innerHTML = "Есть цвета: " + str;
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }
        
                //Если эти конкретные наушники беспроводные и нет чекбокса группировки, то добавляем его
                if (document.getElementById('isSoft') == null && this.isSoft != null && this.isSoft) {
                    let inp = document.createElement("input");
                    inp.setAttribute("type", "checkbox");
                    inp.setAttribute("id", "isSoft");
                    inp.setAttribute("onclick", "CheckSoft(this.checked)");
        
                    let lab = document.createElement("p");
                    lab.appendChild(inp);
                    lab.innerHTML += "Только мягкие<br>";
        
                    let div = document.getElementById('myTools');
                    div.appendChild(lab);
                }

        this.Embed(obj);
    }

    //Вычисление сложных особенностей
    CalculateFlags() {
        //Поиск больших размеров
        this.isSoft = false;
        if (this.list != null)
            for (let i = 0; i < this.list.length; i++) 
                if (this.list[i].isSoft && this.list[i].quantity > 0) {
                    this.isSoft = true;
                    break;
                }
        //Поиск доступных цветов
        let k = 0;
        this.haveColors = [];
        if (this.list != null)
            for (let i = 0; i < this.list.length; i++)
                if (this.haveColors.indexOf(this.list[i].color) == -1)
                    this.haveColors[k++] = this.list[i].color;
    }
}
//Группировка по беспроводным наушникам
function CheckSoft(flag: boolean) {
    document.getElementById('rowts').innerHTML = "";
    if (flag) {
        for (let i = 0; i < this.productList.length; i++)
            if (productList[i] instanceof Pen && (<Pen>productList[i]).isSoft) (<Pen>productList[i]).Init();
    }
    else {
        for (let i = 0; i < this.productList.length; i++)
            productList[i].Init();
    }
}

interface Speaker {
    isPortable: boolean; 
    color: Color; 
    quantity: number; 
}

class Camera extends Product {
    isDigital: boolean; //Есть большие размеры
    haveColors: string[]; //Цвета которые есть
    constructor(protected id: number, public name: string, public price: number, public description: string, public inStock: number, public list?:Speaker[]) {
        super(id, name, price, description, inStock); 
        this.CalculateFlags();
        this.Init();
    }

    Init() {
        let obj = super.Init();
        
        //Если есть большие размеры, то добавляем информацию об этом в карточку
        if (this.isDigital) {
            let p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "Врум-вжжжжж";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }

        //Если есть информация о цвете, то добавляем её в карточку
        if (this.haveColors.length > 0) {
            let p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            let str = this.haveColors[0];
            for (let i = 1; i < this.haveColors.length; i++) {
                str += ", " + this.haveColors[i];
            }
            p.innerHTML = "Есть цвета: " + str;
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }
        
        if (document.getElementById('isPortable') == null && this.isDigital != null && this.isDigital) {
            let inp = document.createElement("input");
            inp.setAttribute("type", "checkbox");
            inp.setAttribute("id", "isPortable");
            inp.setAttribute("onclick", "CheckPortable(this.checked)");

            let lab = document.createElement("p");
            lab.appendChild(inp);
            lab.innerHTML += "Только переносная<br>";

            let div = document.getElementById('myTools');
            div.appendChild(lab);
        }

        this.Embed(obj);
    }

    //Вычисление сложных особенностей
    CalculateFlags() {
        //Поиск больших размеров
        this.isDigital = false;
        if (this.list != null)
            for (let i = 0; i < this.list.length; i++) 
                if (this.list[i].isPortable && this.list[i].quantity > 0) {
                    this.isDigital = true;
                    break;
                }
        //Поиск доступных цветов
        let k = 0;
        this.haveColors = [];
        if (this.list != null)
            for (let i = 0; i < this.list.length; i++)
                if (this.haveColors.indexOf(this.list[i].color) == -1)
                    this.haveColors[k++] = this.list[i].color;
    }
}

//Группировка по беспроводным наушникам
function CheckPortable(flag: boolean) {
    document.getElementById('rowts').innerHTML = "";
    if (flag) {
        for (let i = 0; i < this.productList.length; i++)
            if (productList[i] instanceof Camera && (<Camera>productList[i]).isDigital) (<Camera>productList[i]).Init();
    }
    else {
        for (let i = 0; i < this.productList.length; i++)
            productList[i].Init();
    }
}

//Класс с группировкой
class Headphones extends Product {
    constructor(protected id: number, public name: string, public price: number, public description: string, public inStock: number, public isWireless?: boolean) {
        super(id, name, price, description, inStock);
        this.Init();
    }

    public Init() {
        let obj = super.Init();
        
        //Если наушники беспроводные, то добавляем информацию об этом в карточку
        if (this.isWireless) {
            let p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "Беспроводные";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }

        //Если эти конкретные наушники беспроводные и нет чекбокса группировки, то добавляем его
        if (document.getElementById('isWireless') == null && this.isWireless != null && this.isWireless) {
            let inp = document.createElement("input");
            inp.setAttribute("type", "checkbox");
            inp.setAttribute("id", "isWireless");
            inp.setAttribute("onclick", "CheckWireless(this.checked)");

            let lab = document.createElement("p");
            lab.appendChild(inp);
            lab.innerHTML += "Только беспроводные<br>";

            let div = document.getElementById('myTools');
            div.appendChild(lab);
        }

        this.Embed(obj);
    }
}

//Группировка по беспроводным наушникам
function CheckWireless(flag: boolean) {
    document.getElementById('rowts').innerHTML = "";
    if (flag) {
        for (let i = 0; i < this.productList.length; i++)
            if (productList[i] instanceof Headphones && (<Headphones>productList[i]).isWireless) (<Headphones>productList[i]).Init();
    }
    else {
        for (let i = 0; i < this.productList.length; i++)
            productList[i].Init();
    }
}

//Класс пока не имеющий отличий от базового
class Balalaika extends Product {
    constructor(protected id: number, public name: string, public price: number, public description: string, public inStock: number) {
        super(id, name, price, description, inStock);
        this.Init();
    }

    Init() {
        this.Embed(super.Init());
    }
}

interface BasketRecord {
    id: number; //id товара
    quantity: number; //Его количество
}

class Basket {
    private list: BasketRecord[] = []; //Список товаров в корзине

    constructor() {
        
    }

    //Добавить товар в корзину. Возвращает результат операции
    Add(val: number): boolean {
        let num = +(<HTMLInputElement>document.getElementById('inputquantity')).value;

        //Проверка введенного количества товара. Если ввели ерунду, то выводится сообщение об ошибке. Иначе товар добавляется в корзину
        if (isNaN(num) || !((num ^ 0) === num) || num == 0 || productList[val].inStock < num) {
            if (productList[val].inStock < num) document.getElementById('modlalMessag').innerHTML = "Столько на складе нет";
            else document.getElementById('modlalMessag').innerHTML = "Введите целое число";
            return false;
        }
        else {
            document.getElementById('modlalMessag').innerHTML = "";
            productList[val].inStock -= num;
            this.list[this.list.length] = { id: val, quantity: num };
            this.UniteSameElements();
            this.CalculateBasket();
            return true;
        }
    }

    UniteSameElements() {
        if (this.list.length >= 2){
            for (let i = 0; i < this.list.length; i++){
                let equalsElement = this.list.filter(el => el.id == this.list[i].id);
                console.log(equalsElement);
                if (equalsElement.length > 1) {
                    let quantity: number = equalsElement[1].quantity;
                    this.list[this.list.indexOf(equalsElement[0])].quantity += quantity;
                    this.list.splice(this.list.indexOf(equalsElement[1]), 1);
                }
            }
        }
    }

    //Пересчитать товары в корзине
    CalculateBasket() {
        if (this.list.length > 0) {
            let id;
            let total: number = 0;
            let message: string = "В даннвй момент в корзине:<br>";
            for (let i = 0; i < this.list.length; i++) {
                message += productList[this.list[i].id].name + " - " + this.list[i].quantity + "<br>";
                total += productList[this.list[i].id].price * this.list[i].quantity;
            }
            message += "<br><br>На общую сумму " + total + " грн.";

            document.getElementById('myBasket').innerHTML = message;
        }
        else document.getElementById('myBasket').innerHTML = "В данный момент корзина пустая";
    }
}


//Действие на кнопке "добавить в корзину"
function myByBtn(val: any) {
    if (basket.Add(val)) $('#buyModal').modal('hide');
}

//Действие на кнопке "купить"
function WantBuy(val: any) {
    document.getElementById('modlalBtn').setAttribute("value", val);
}

//Инициализация корзины
let basket: Basket = new Basket();
//Список продуктов
let productList: Product[] = [
    new Headphones(0, "Super smash headphones", 816, "Прекрасные наушники! Сама английская королева слушает жесткий металл через такие же!", 4, true),
    new FeltBoots(1, "Валенки2", 91.2, "Хороший выбор! В них тепло, хорошо. Обувь многосезонная - лето, осень, зима, весна.", 6,
        [{ dimension: 44, color: Color.Black, quantity: 2 },
            { dimension: 43, color: Color.Black, quantity: 3 },
            { dimension: 42, color: Color.Black, quantity: 1 },
            { dimension: 41, color: Color.Black, quantity: 2 },
            { dimension: 44, color: Color.Gray, quantity: 2 },
            { dimension: 39, color: Color.Gray, quantity: 1 },
            { dimension: 45, color: Color.Gray, quantity: 1 },
            { dimension: 42, color: Color.Gray, quantity: 1 },
        ]),
    new Headphones(2, "Наушники фирмы4", 119.50, "Дёшево не значит плохо! Эти наушники стоят своих денег!", 30, false),
    new Headphones(3, "Наушники фирмы2", 144, "Это оптимальный выбор! Налетай торопись!", 15, true),
    new Balalaika(4, "Балалайка1", 915, "Сам страдивари её выстругал! Мастер Страдивари Аарон Моисеевич ©. В комплекте к балалайке должен идти медведь.", 1),
    new FeltBoots(5, "Валенки 3", 65, "Валенки знаменитой российской фабрики Красный ЦинБаоЧен. Оригинальный продукт сделаный по технологиям прошлого.", 10),
    new Headphones(6, "Наушники фирмы3", 265, "Тру поклонники музыки обязательно такие имеют! А ты что? Ты не тру?!", 0),
    new FeltBoots(7, "Валенки1", 666.66, "Валенки великолепной работы слепого мастера Игната! В комплекте к валенкам идёт кокошник.", 2,
        [
            { dimension: 45, color: Color.Pink, quantity: 1 },
            { dimension: 43, color: Color.Pink, quantity: 1 }
        ]),
    new Pen(8, "олівець", 12, "Для малювання", 90, 
        [
            {isSoft: true, color: Color.Pink, quantity: 1},
            {isSoft: false, color: Color.Pink, quantity: 1}
        ]),
    new Camera(9, "Болгарка", 4999, "Розовая)", 90, 
        [
            {isPortable: true, color: Color.Pink, quantity: 1},
            {isPortable: true, color: Color.Pink, quantity: 1}
        ]),
    new Balalaika(10, "Балалайка2", 217, "Обычная балалайка белорусской фирмы Змрочныя мелодыі.", 1),
    new FeltBoots1(11, "Белье1", 65, "белье,белье,белье.", 5),
    new FeltBoots1(12, "Белье3", 366, "Белье с разных стран", 3,
        [
            { dimension: 55, color: Country.USA, quantity: 1 },
            { dimension: 43, color: Country.Ukr, quantity: 2 }
        ]),
]
