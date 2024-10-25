import { NodeRBT } from "./NodeRBT";
export class Producto {
    private code: string; 
    private name: string;
    private price: number

    constructor(code: string, name: string, price: number) {
        this.code = code
        this.price = price
        this.name = name
    }

    public getPrice(): number {
        return this.price
    }

    public getCode(): string {
        return this.code
    }
    public getName(): string {
        return this.code
    }

    public imprimir(): string {
        return "Código: " + this.code + " => Producto: " + this.name + " => Precio: " + this.price;
    }
    
}
export class Red_black_tree {
    private root: NodeRBT;
    private leaf: NodeRBT;
    private data: Producto[];

    constructor() {
        this.leaf = new NodeRBT(0, true);
        this.root = this.leaf;
        this.data =new Array(10);
    }

    private fixInsert(testNode: NodeRBT): void {
        while (testNode !== this.root && testNode.getFather().getColor() === "RED") {
            // Si el padre de testNode está en el hijo izquierdo del abuelo de testNode
            if (testNode.getFather() === testNode.getFather().getFather().getLeftChild()) {
                // El tío es el hijo derecho del abuelo de testNode
                let uncle: NodeRBT = testNode.getFather().getFather().getRightChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    // Comprobamos si testNode es hijo derecho
                    if (testNode === testNode.getFather().getRightChild()) {
                        testNode = testNode.getFather();
                        this.leftRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.rightRotate(testNode.getFather().getFather());
                }
            } else {
                // El tío es el hijo izquierdo del abuelo de testNode
                let uncle: NodeRBT = testNode.getFather().getFather().getLeftChild();
                if (uncle.getColor() === "RED") {
                    testNode.getFather().setNodeAsBlack();
                    uncle.setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    testNode = testNode.getFather().getFather();
                } else {
                    // Comprobamos si testNode es hijo izquierdo
                    if (testNode === testNode.getFather().getLeftChild()) {
                        testNode = testNode.getFather();
                        this.rightRotate(testNode);
                    }
                    testNode.getFather().setNodeAsBlack();
                    testNode.getFather().getFather().setNodeAsRed();
                    this.leftRotate(testNode.getFather().getFather());
                }
            }
        }
        this.root.setNodeAsBlack();
    }

    private leftRotate(x: NodeRBT): void {
        let y: NodeRBT = x.getRightChild();
        x.setRightChild(y.getLeftChild());
        if (y.getLeftChild() !== this.leaf) {
            y.getLeftChild().setFather(x);
        }
        y.setFather(x.getFather());
        if (x.getFather() === this.leaf) {
            this.root = y;
        } else if (x === x.getFather().getLeftChild()) {
            x.getFather().setLeftChild(y);
        } else {
            x.getFather().setRightChild(y);
        }
        y.setLeftChild(x);
        x.setFather(y);
    }

    private rightRotate(x: NodeRBT): void {
        let y: NodeRBT = x.getLeftChild();
        x.setLeftChild(y.getRightChild());
        if (y.getRightChild() !== this.leaf) {
            y.getRightChild().setFather(x);
        }
        y.setFather(x.getFather());
        if (x.getFather() === this.leaf) {
            this.root = y;
        } else if (x === x.getFather().getRightChild()) {
            x.getFather().setRightChild(y);
        } else {
            x.getFather().setLeftChild(y);
        }
        y.setRightChild(x);
        x.setFather(y);
    }

    private printNodeInorder(nodo: NodeRBT): void {
        if (nodo.getLeftChild() !== this.leaf) {
            this.printNodeInorder(nodo.getLeftChild());
        }
        console.log(nodo.getData());
        if (nodo.getRightChild() !== this.leaf) {
            this.printNodeInorder(nodo.getRightChild());
        }
    }

    public printAll(): void {
        
        this.printNodeInorder(this.root);
        
        
    }

    public insert(data: Producto): void {
        let newNode: NodeRBT = new NodeRBT(data.getPrice());
        
        let parent: NodeRBT = this.leaf;
        let current: NodeRBT = this.root;
        newNode.setLeftChild(this.leaf);
        newNode.setRightChild(this.leaf);

        while (current !== this.leaf) {
            parent = current;
            if (newNode.getData() < current.getData()) {
                current = current.getLeftChild();
            } else {
                current = current.getRightChild();
            }
        }
        newNode.setFather(parent);
        if (parent === this.leaf) {
            this.root = newNode;
        } else if (newNode.getData() < parent.getData()) {
            parent.setLeftChild(newNode);
        } else {
            parent.setRightChild(newNode);
        }

        if (newNode.getFather() === this.leaf) {
            newNode.setNodeAsBlack();
            return;
        }
        if (newNode.getFather().getFather() === this.leaf) {
            return;
        }
        this.fixInsert(newNode);
        
    }

    public delete(data: Producto): void {
        let nodeToDelete: NodeRBT = this.searchNode(this.root, data.getPrice());
        if (nodeToDelete === this.leaf) {
            console.log("Nodo no encontrado");
            return;
        }

        let y: NodeRBT = nodeToDelete;
        let yOriginalColor: string = y.getColor();
        let x: NodeRBT;

        if (nodeToDelete.getLeftChild() === this.leaf) {
            x = nodeToDelete.getRightChild();
            this.transplant(nodeToDelete, nodeToDelete.getRightChild());
        } else if (nodeToDelete.getRightChild() === this.leaf) {
            x = nodeToDelete.getLeftChild();
            this.transplant(nodeToDelete, nodeToDelete.getLeftChild());
        } else {
            y = this.minimum(nodeToDelete.getRightChild());
            yOriginalColor = y.getColor();
            x = y.getRightChild();

            if (y.getFather() !== nodeToDelete) {
                this.transplant(y, y.getRightChild());
                y.setRightChild(nodeToDelete.getRightChild());
                y.getRightChild().setFather(y);
            }

            this.transplant(nodeToDelete, y);
            y.setLeftChild(nodeToDelete.getLeftChild());
            y.getLeftChild().setFather(y);
            y.setNodeAsRed();
        }

        if (yOriginalColor === "BLACK") {
            this.fixDelete(x);
        }
    }

    private searchNode(nodo: NodeRBT, data: number): NodeRBT {
        if (nodo === this.leaf || data === nodo.getData()) {
            return nodo;
        }
        if (data < nodo.getData()) {
            return this.searchNode(nodo.getLeftChild(), data);
        } else {
            return this.searchNode(nodo.getRightChild(), data);
        }
    }

    private minimum(nodo: NodeRBT): NodeRBT {
        while (nodo.getLeftChild() !== this.leaf) {
            nodo = nodo.getLeftChild();
        }
        return nodo;
    }

    private transplant(u: NodeRBT, v: NodeRBT): void {
        if (u.getFather() === this.leaf) {
            this.root = v;
        } else if (u === u.getFather().getLeftChild()) {
            u.getFather().setLeftChild(v);
        } else {
            u.getFather().setRightChild(v);
        }
        v.setFather(u.getFather());
    }

    private fixDelete(x: NodeRBT): void {
        while (x !== this.root && x.getColor() === "BLACK") {
            if (x === x.getFather().getLeftChild()) {
                let w: NodeRBT = x.getFather().getRightChild();
                if (w.getColor() === "RED") {
                    w.setNodeAsBlack();
                    x.getFather().setNodeAsRed();
                    this.leftRotate(x.getFather());
                    w = x.getFather().getRightChild();
                }
                if (w.getLeftChild().getColor() === "BLACK" && w.getRightChild().getColor() === "BLACK") {
                    w.setNodeAsRed();
                    x = x.getFather();
                } else {
                    if (w.getRightChild().getColor() === "BLACK") {
                        w.getLeftChild().setNodeAsBlack();
                        w.setNodeAsRed();
                        this.rightRotate(w);
                        w = x.getFather().getRightChild();
                    }
                    w.setColor(x.getFather().getColor());
                    x.getFather().setNodeAsBlack();
                    w.getRightChild().setNodeAsBlack();
                    this.leftRotate(x.getFather());
                    x = this.root;
                }
            } else {
                let w: NodeRBT = x.getFather().getLeftChild();
                if (w.getColor() === "RED") {
                    w.setNodeAsBlack();
                    x.getFather().setNodeAsRed();
                    this.rightRotate(x.getFather());
                    w = x.getFather().getLeftChild();
                }
                if (w.getRightChild().getColor() === "BLACK" && w.getLeftChild().getColor() === "BLACK") {
                    w.setNodeAsRed();
                    x = x.getFather();
                } else {
                    if (w.getLeftChild().getColor() === "BLACK") {
                        w.getRightChild().setNodeAsBlack();
                        w.setNodeAsRed();
                        this.leftRotate(w);
                        w = x.getFather().getLeftChild();
                    }
                    w.setColor(x.getFather().getColor());
                    x.getFather().setNodeAsBlack();
                    w.getLeftChild().setNodeAsBlack();
                    this.rightRotate(x.getFather());
                    x = this.root;
                }
            }
        }
        x.setNodeAsBlack();
    }
}

