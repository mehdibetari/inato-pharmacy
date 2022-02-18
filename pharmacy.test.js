import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  describe("Drugs Prerequisite", () => {
    it("should have an `expiresIn`and `benefit` values", () => {
      // todo Error case : add validation of drug attributes
      expect(
        new Pharmacy([new Drug("test")]).updateBenefitValue()
      ).toEqual([new Drug("test", NaN, undefined)]);
    });
  });
  describe("Initial behavior", () => {
    
    it("should decrease the benefit and expiresIn", () => {
      expect(
        new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()
      ).toEqual([new Drug("test", 1, 2)]);
    });
    it("should decrease twice the benefit after expire", () => {
      expect(new Pharmacy([new Drug("test", 0, 3)]).updateBenefitValue()).toEqual(
        [new Drug("test", -1, 1)]
      );
    });
    it("should never decrease benefit under zero", () => {
      expect(new Pharmacy([new Drug("test", 0, 0)]).updateBenefitValue()).toEqual(
        [new Drug("test", -1, 0)]
      );
      // todo Error case : drug with negative benefit initialy added to the pharmacy
    });
    it("should never increase benefit over fifty", () => {
      expect(new Pharmacy([new Drug("Herbal Tea", 0, 50)]).updateBenefitValue()).toEqual(
        [new Drug("Herbal Tea", -1, 50)]
      );
      expect(new Pharmacy([new Drug("Herbal Tea", 15, 50)]).updateBenefitValue()).toEqual(
        [new Drug("Herbal Tea", 14, 50)]
      );
    });
  });
  describe("Particular behavior", () => {
    describe("Herbal Tea", () => {
      it("should increase the benefit before expire", () => {
        expect(
          new Pharmacy([new Drug("Herbal Tea", 2, 3)]).updateBenefitValue()
        ).toEqual([new Drug("Herbal Tea", 1, 4)]);
      });
      it("should increase twice the benefit after expire", () => {
        expect(
          new Pharmacy([new Drug("Herbal Tea", 0, 3)]).updateBenefitValue()
        ).toEqual([new Drug("Herbal Tea", -1, 5)]);
      });
    });
    describe("Magic Pill", () => {
      it("should never expires nor decreases in Benefit", () => {
        expect(
          new Pharmacy([new Drug("Magic Pill", 15, 40)]).updateBenefitValue()
        ).toEqual([new Drug("Magic Pill", 15, 40)]);
        expect(
          new Pharmacy([new Drug("Magic Pill", 0, 0)]).updateBenefitValue()
        ).toEqual([new Drug("Magic Pill", 0, 0)]);
        expect(
          new Pharmacy([new Drug("Magic Pill", -1, -1)]).updateBenefitValue()
        ).toEqual([new Drug("Magic Pill", -1, -1)]);
      });
    });
    describe("Fervex", () => {
      it("should increase the benefit before expire", () => {
        expect(
          new Pharmacy([new Drug("Fervex", 11, 3)]).updateBenefitValue()
        ).toEqual([new Drug("Fervex", 10, 4)]);
      });
      it("should increases by 2 when there are 10 days or less", () => {
        expect(
          new Pharmacy([new Drug("Fervex", 10, 40)]).updateBenefitValue()
        ).toEqual([new Drug("Fervex", 9, 42)]);
        expect(
          new Pharmacy([new Drug("Fervex", 6, 40)]).updateBenefitValue()
        ).toEqual([new Drug("Fervex", 5, 42)]);
      });
      it("should increases by 3 when there are 5 days or less", () => {
        expect(
          new Pharmacy([new Drug("Fervex", 5, 40)]).updateBenefitValue()
        ).toEqual([new Drug("Fervex", 4, 43)]);
        expect(
          new Pharmacy([new Drug("Fervex", 1, 40)]).updateBenefitValue()
        ).toEqual([new Drug("Fervex", 0, 43)]);
      });
      it("should drops Benefits to 0 after the expiration date", () => {
        expect(
          new Pharmacy([new Drug("Fervex", 0, 40)]).updateBenefitValue()
        ).toEqual([new Drug("Fervex", -1, 0)]);
      });
      
    });
  });
});

