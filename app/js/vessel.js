/**
 * Создает экземпляр космического корабля.
 * @name Vessel
 * @param {String} name Название корабля.
 * @param {Number}[] position Местоположение корабля.
 * @param {Number} capacity Грузоподъемность корабля.
 */
function Vessel(name, position, capacity) {
    this.prototype = {
        name: name,
        position: position,
        capacity: capacity,
        cargo: 0,
        placement: null
    };
}

/**
 * Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
 * @name Vessel.report
 */
Vessel.prototype.report = function() {
    // var selfPhrase = "Корабль \"" + this.prototype.name + "\".";
    var selfPhrase = "Ship \"" + this.prototype.name + "\".";
    var place;
    if (this.prototype.placement === null) {
        place = this.prototype.position;
    } else {
        place = this.prototype.placement + " (" + this.prototype.position + ")";
    }
    var placePhrase = "Placement: " + place + ".";
    var cargoPhrase = "Occupied: " + this.prototype.cargo
            + " from " + this.prototype.capacity + "t.";

    return selfPhrase + " " + placePhrase + " " + cargoPhrase;
};

/**
 * Выводит количество свободного места на корабле.
 * @name Vessel.getFreeSpace
 */
Vessel.prototype.getFreeSpace = function() {
    return this.prototype.capacity - this.prototype.cargo;
};

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.getOccupiedSpace
 */
Vessel.prototype.getOccupiedSpace = function() {
    return this.prototype.cargo;
};

/**
 * Переносит корабль в указанную точку.
 * @param {Number}[]|Planet newPosition Новое местоположение корабля.
 * @example
 * vessel.flyTo([1,1]);
 * @example
 * var earth = new Planet('Земля', [1,1]);
 * vessel.flyTo(earth);
 * @name Vessel.report
 */
Vessel.prototype.flyTo = function(newPosition) {
    if (newPosition !== null) {
        if (newPosition instanceof Planet) {
            this.prototype.placement = newPosition.getName();
            this.prototype.position = newPosition.getPosition();
        } else {
            this.prototype.placement = null;
            this.prototype.position = newPosition;
        }
    }
};

/**
 * Загрузка груза на корабль.
 * @param {Number} weight вес груза
 * @returns {undefined}
 */
Vessel.prototype.load = function(weight) {
    if (this.prototype.cargo + weight > this.prototype.capacity) {
        throw "the cargo weight is too big";
    }
    this.prototype.cargo = this.prototype.cargo + weight;
};

/**
 * Разгрузка груза
 * @param {Number} weight вес груза
 * @returns {Number} вес груза, который был разгружен
 */
Vessel.prototype.unload = function(weight) {
    if (this.prototype.cargo < weight) {
        var unloaded = this.prototype.cargo;
        this.prototype.cargo = 0;
        return unloaded;
    }
    this.prototype.cargo -= weight;
    return weight;
};