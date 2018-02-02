let bookLiteral = {name: 'Good parts of JS', price: 300, sellingPrice: function(tax) {return this.price + tax}}
console.log(bookLiteral.sellingPrice(30))

let bookNew = new Object()
bookNew.name = 'Good parts of JS'
bookNew.price = 300
bookNew.sellingPrice = bookLiteral.sellingPrice
let someMethod = 'sellingPrice'
console.log(bookNew[someMethod](30))

function BookProto(name, price) {
 this.name = name;
 this.price = price;
 this.sellingPrice = function(tax) { return this.price + tax }
}

let bookCustom = new BookProto('Good parts of JS', 300)
console.log(bookCustom.sellingPrice(30))

let bookCustomTwo = new BookProto('Function Js', 500)
console.log(bookCustomTwo.sellingPrice(50))

bookLiteral.author = 'John'
bookLiteral.discountPrice = function(percent) { return this.sellingPrice(10) * (1-(percent/100)) }
console.log(bookLiteral.discountPrice(10))

BookProto.prototype.discountPrice = function(percent) { return this.sellingPrice(10) * (1-(percent/100)) }
console.log(bookCustom.discountPrice(10))

console.log(bookCustomTwo.discountPrice(10))

let book = {name: 'Good parts of JS', price: 300 }
console.log(bookLiteral.sellingPrice.call(book, 10))

function TextBook(type, name, price) {
 BookProto.call(this, name, price)
 this.type = type
}
console.log(new TextBook('CS', 'ff', 100).sellingPrice(99))

//new TextBook('CS', 'ff', 100).discountPrice(99)

TextBook.prototype = Object.create(BookProto.prototype)
console.log(new TextBook('CS', 'ff', 100).discountPrice(99))

let testBook = {price: 100}
testBook.__proto__ = bookLiteral
console.log(testBook.sellingPrice(10))
