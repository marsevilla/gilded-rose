import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });

  it('should decrease quality two times faster when sellIn is less than 0', () => {
    const gildedRose = new GildedRose([new Item('foo', -1, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
  });

  it('should not decrease quality below 0', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('should Aged Brie increase quality the older it gets', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(12);
  });

  it('should quality of an item is never more than 50', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 0, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it('should Sulfuras never has sellIn to be zero and quality to be changed', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(80);
  });

  it('should Backstage increase quality when sellIn decrease', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(11);
  });

  it('should Backstage quality increase by 2 when sellIn is less than 10', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(12);
  });

  it('should Backstage quality increase by 3 when sellIn is equal or less than 5', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(13);
  });

  it('should Backstage quality drop to 0 after concert', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('should Conjured items degrade in quality twice as fast', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 3, 6)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(4);
  });

  it('should Conjured items degrade four times as fast after sell-by date', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 0, 6)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
  });

  it('should Conjured items quality never go below 0', () => {
    const gildedRose = new GildedRose([new Item('Conjured Mana Cake', 0, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
});
