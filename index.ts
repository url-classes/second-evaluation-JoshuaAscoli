import { Red_black_tree } from "./rbt";
import { Producto } from "./rbt";



let jabon: Producto = new Producto('P001', 'Jabón', 14);
let goma: Producto = new Producto('P002', 'Goma', 15);
let computadora: Producto = new Producto('P003', 'Computadora', 13);
let lapiz: Producto = new Producto('P004', 'Lápiz', 3);
let papel: Producto = new Producto('P005', 'Papel', 16);
console.log(jabon.imprimir())

let myTree: Red_black_tree = new Red_black_tree()
myTree.insert(jabon)
myTree.insert(goma)
myTree.insert(computadora)
myTree.insert(lapiz)
myTree.insert(papel)

myTree.delete(jabon)
myTree.printAll()

