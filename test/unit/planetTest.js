PlanetTest = TestCase("PlanetTest");

/**
 * Проверка работы конструктора
 * @returns {undefined}
 */
PlanetTest.prototype.testCtor = function() {
    // GIVEN
    // WHEN
    var planet = new Planet('A', [0, 0], 0);
    // THEN
    assertEquals('A', planet.prototype.name);
    assertEquals([0, 0], planet.prototype.position);
    assertEquals(0, planet.prototype.cargo);
};

/**
 * Проверка вывода отчета.
 * @returns {undefined}
 */
PlanetTest.prototype.testReport = function() {
    // GIVEN
    var planet = new Planet('A', [0, 0], 0);
    // WHEN
    var report = planet.report();
    // THEN
    assertEquals('Planet "A". Placement: 0,0. No cargos.', report);
};

/**
 * Проверка вывода отчёта для планеты с грузом.
 * @returns {undefined}
 */
PlanetTest.prototype.testReportWithCargo = function() {
    // GIVEN
    var planet = new Planet('A', [0, 0], 5000);
    // WHEN
    var report = planet.report();
    // THEN
    assertEquals(5000, planet.getAvailableAmountOfCargo());
    assertEquals('Planet "A". Placement: 0,0. Available cargos: 5000t.', report);
};

/**
 * Проверка загрузки груза с планеты на кораблю.
 * @returns {undefined}
 */
PlanetTest.prototype.testLoadTo = function() {
    // GIVEN
    var vessel = new Vessel('Yandex', [0, 0], 1000);
    var planet = new Planet('Alpha', [1,2], 5000);
    vessel.flyTo(planet);
    // WHEN
    planet.loadCargoTo(vessel, 500);
    // THEN
    assertEquals(4500, planet.getAvailableAmountOfCargo());
    assertEquals(500, vessel.getOccupiedSpace());
    assertEquals(500, vessel.getFreeSpace());
};

/**
 * Проверка разгрузки груза с корабля на планету.
 * @returns {undefined}
 */
PlanetTest.prototype.testUnloadFrom = function() {
    // GIVEN
    var vessel = new Vessel('Yandex', [0, 0], 1000);
    var planet = new Planet('Alpha', [1,2], 4400);
    vessel.flyTo(planet);
    vessel.load(600);
    // WHEN
    planet.unloadCargoFrom(vessel, 600);
    // THEN
    assertEquals(5000, planet.getAvailableAmountOfCargo());
    assertEquals(0, vessel.getOccupiedSpace());
    assertEquals(1000, vessel.getFreeSpace());
};

/**
 * Проверка разгрузки груза, если на корабле меньшее его количество.
 * @returns {undefined}
 */
PlanetTest.prototype.testOverheadUnloadFrom = function() {
    // GIVEN
    var vessel = new Vessel('Yandex', [0, 0], 1000);
    var planet = new Planet('Alpha', [1,2], 4400);
    vessel.flyTo(planet);
    vessel.load(600);
    // WHEN
    planet.unloadCargoFrom(vessel, 1000);
    // THEN
    assertEquals(5000, planet.getAvailableAmountOfCargo());
    assertEquals(0, vessel.getOccupiedSpace());
    assertEquals(1000, vessel.getFreeSpace());
};
