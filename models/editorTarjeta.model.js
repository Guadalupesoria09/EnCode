const db = require('../utils/database');

module.exports = class EditorTarjeta {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(mi_color, mi_background, mi_font) {
        this.color = mi_color;
        this.background = mi_background;
        this.font = mi_font;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute(
            'INSERT INTO editorTarjeta(color, background, font) VALUES(?, ?, ?)', 
            [this.color, this.background, this.font]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute('SELECT * FROM editorTarjeta');
    }

    static fetchOne(id) {
        return db.execute('SELECT * FROM editorTarjeta WHERE idEditorTarjeta = ?', [id]);
    }

    static fetch(id) {
        if (id) {
            return this.fetchOne(id);
        } else {
            return this.fetchAll();
        }
    }

}