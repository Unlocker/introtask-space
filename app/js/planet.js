/**
 * Создает экземпляр планеты.
 * @name Planet
 * @param {String} name Название Планеты.
 * @param {Number}[] position Местоположение планеты.
 * @param {Number} availableAmountOfCargo Доступное количество груза.
 */
function Planet(name, position, availableAmountOfCargo) {
    this.prototype = {
        name: name,
        position: position,
        cargo: availableAmountOfCargo
    };
}

/**
 * Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
 * @name Planet.report
 */
Planet.prototype.report = function() {
    var selfPhrase = "Planet \"" + this.prototype.name + "\".";
    var placePhrase = "Placement: " + this.prototype.position + ".";

    var cargoPhrase;
    if (this.prototype.cargo > 0) {
        cargoPhrase = "Available cargos: " + this.prototype.cargo + "t.";
    } else {
        cargoPhrase = "No cargos.";
    }

    return selfPhrase + " " + placePhrase + " " + cargoPhrase;
};

/**
 * Возвращает доступное количество груза планеты.
 * @name Vessel.getAvailableAmountOfCargo
 */
Planet.prototype.getAvailableAmountOfCargo = function() {
    return this.prototype.cargo;
};

/**
 * Загружает на корабль заданное количество груза.
 * 
 * Перед загрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Загружаемый корабль.
 * @param {Number} cargoWeight Вес загружаемого груза.
 * @name Vessel.loadCargoTo
 */
Planet.prototype.loadCargoTo = function(vessel, cargoWeight) {
    if (vessel instanceof Vessel && vessel.getFreeSpace() >= cargoWeight) {
        var actualWeight;
        if (cargoWeight > this.prototype.cargo) {
            actualWeight = this.prototype.cargo;
        } else {
            actualWeight = cargoWeight;
        }
        this.prototype.cargo = this.prototype.cargo - actualWeight;
        vessel.load(actualWeight);
    }
};

/**
 * Выгружает с корабля заданное количество груза.
 * 
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Разгружаемый корабль.
 * @param {Number} cargoWeight Вес выгружаемого груза.
 * @name Vessel.unloadCargoFrom
 */
Planet.prototype.unloadCargoFrom = function(vessel, cargoWeight) {
    if (vessel instanceof Vessel) {
        var actualWeight = vessel.unload(cargoWeight);
        this.prototype.cargo += actualWeight;
    }
};

/**
 * @returns {name} Название планеты
 */
Planet.prototype.getName = function() {
    return this.prototype.name;
};

/**
 * @returns {Number} Местоположение
 */
Planet.prototype.getPosition = function() {
    return this.prototype.position;
};
