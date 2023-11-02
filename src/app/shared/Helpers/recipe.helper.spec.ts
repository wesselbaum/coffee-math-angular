import { buildRatioConf } from './tests/recipe.helper';
import { simplifyRatio } from './recipe.helper';

describe('recipe helper', () => {
  it('should simplify ratio', () => {
    expect(
      simplifyRatio(
        buildRatioConf({
          relationship: { coffeeG: 5, waterMl: 10 },
        })
      )
    ).toEqual({
      waterInGroundCoffeeCapacity: 2.2,
      relationship: { coffeeG: 1, waterMl: 2 },
    });

    expect(
      simplifyRatio(
        buildRatioConf({
          relationship: { coffeeG: 14, waterMl: 250 },
        })
      )
    ).toEqual({
      waterInGroundCoffeeCapacity: 2.2,
      // 18 since 250 / 14 = 17.857...
      relationship: { coffeeG: 1, waterMl: 18 },
    });

    expect(
      simplifyRatio(
        buildRatioConf({
          relationship: { coffeeG: 14, waterMl: 242 },
        })
      )
    ).toEqual({
      waterInGroundCoffeeCapacity: 2.2,
      // 17 since 242 / 14 = 17.285...
      relationship: { coffeeG: 1, waterMl: 17 },
    });
  });
});
