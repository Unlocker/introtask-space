IntegrationTest = TestCase("IntegrationTest");

/**
 * Основной тест функциональности.
 * @returns {undefined}
 */
IntegrationTest.prototype.testMainScenario = function() {
    var vessel = new Vessel('Yandex', [0, 0], 1000);
    var planetA = new Planet('A', [0, 0], 0);
    var planetB = new Planet('B', [100, 100], 5000);

    // Проверка текущего состояния
    assertEquals('Ship "Yandex". Placement: 0,0. Occupied: 0 from 1000t.', vessel.report());
    assertEquals('Planet "A". Placement: 0,0. No cargos.', planetA.report());
    assertEquals('Planet "B". Placement: 100,100. Available cargos: 5000t.', planetB.report());

    vessel.flyTo(planetB);
    planetB.loadCargoTo(vessel, 1000);
    assertEquals('Ship "Yandex". Placement: B (100,100). Occupied: 1000 from 1000t.', vessel.report());

    vessel.flyTo(planetA);
    planetA.unloadCargoFrom(vessel, 500);
    assertEquals('Ship "Yandex". Placement: A (0,0). Occupied: 500 from 1000t.', vessel.report());
    assertEquals('Planet "A". Placement: 0,0. Available cargos: 500t.', planetA.report());
    assertEquals('Planet "B". Placement: 100,100. Available cargos: 4000t.', planetB.report());
};


