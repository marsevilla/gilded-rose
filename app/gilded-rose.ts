export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let item of this.items) {
      if (item.name !== 'Sulfuras, Hand of Ragnaros') {
        let degradeRate = 1;

        // Special case for Conjured items: they degrade twice as fast
        if (item.name.includes('Conjured')) {
          degradeRate = 2;
        }

        if (item.name === 'Aged Brie') {
          item.quality = Math.min(item.quality + 1, 50);
        } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.sellIn <= 0) {
            item.quality = 0;
          } else if (item.sellIn <= 5) {
            item.quality = Math.min(item.quality + 3, 50);
          } else if (item.sellIn <= 10) {
            item.quality = Math.min(item.quality + 2, 50);
          } else {
            item.quality = Math.min(item.quality + 1, 50);
          }
        } else {
          item.quality = Math.max(item.quality - degradeRate, 0);
        }

        // Reduce sellIn (except for Sulfuras)
        item.sellIn -= 1;

        // If past sell date, degrade quality further
        if (item.sellIn < 0) {
          if (item.name === 'Aged Brie') {
            item.quality = Math.min(item.quality + 1, 50);
          } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
            item.quality = 0;
          } else {
            item.quality = Math.max(item.quality - degradeRate, 0);
          }
        }
      }
    }
    return this.items;
  }
}
