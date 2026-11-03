const {Shop, Item} = require("../src/gilded_rose");

// Avance d'un jour et renvoie l'objet mis à jour
function unJour(name, sellIn, quality) {
  return new Shop([new Item(name, sellIn, quality)]).updateQuality()[0];
}

describe("Gilded Rose", function() {
  describe("objet normal", function() {
    it("perd 1 en qualité et en sellIn chaque jour", function() {
      const item = unJour("foo", 10, 20);
      expect(item.sellIn).toBe(9);
      expect(item.quality).toBe(19);
    });
    it("perd 2 en qualité après la date", function() {
      expect(unJour("foo", 0, 20).quality).toBe(18);
    });
    it("ne descend jamais sous 0", function() {
      expect(unJour("foo", 0, 1).quality).toBe(0);
      expect(unJour("foo", 5, 0).quality).toBe(0);
    });
  });

  describe("Aged Brie", function() {
    it("gagne 1 en qualité", function() {
      expect(unJour("Aged Brie", 10, 20).quality).toBe(21);
    });
    it("gagne 2 après la date", function() {
      expect(unJour("Aged Brie", 0, 20).quality).toBe(22);
    });
    it("ne dépasse jamais 50", function() {
      expect(unJour("Aged Brie", 0, 49).quality).toBe(50);
      expect(unJour("Aged Brie", 10, 50).quality).toBe(50);
    });
  });

  describe("Backstage passes", function() {
    const pass = "Backstage passes to a TAFKAL80ETC concert";
    it("gagne 1 à plus de 10 jours", function() {
      expect(unJour(pass, 11, 20).quality).toBe(21);
    });
    it("gagne 2 à 10 jours ou moins", function() {
      expect(unJour(pass, 10, 20).quality).toBe(22);
    });
    it("gagne 3 à 5 jours ou moins", function() {
      expect(unJour(pass, 5, 20).quality).toBe(23);
    });
    it("tombe à 0 après le concert", function() {
      expect(unJour(pass, 0, 20).quality).toBe(0);
    });
    it("ne dépasse jamais 50", function() {
      expect(unJour(pass, 5, 49).quality).toBe(50);
    });
  });

  describe("Sulfuras", function() {
    it("ne change jamais", function() {
      const item = unJour("Sulfuras, Hand of Ragnaros", 0, 80);
      expect(item.sellIn).toBe(0);
      expect(item.quality).toBe(80);
    });
  });
});