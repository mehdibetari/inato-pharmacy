import { updateBenefitValue } from "./pharmacy";

describe("Pharmacy", () => {
  describe("Initial behavior", () => {
    it("should decrease the benefit and expiresIn", () => {
      expect(
        updateBenefitValue([{ name: "test", expiresIn: 2, benefit: 3 }])
      ).toEqual([{ name: "test", expiresIn: 1, benefit: 2 }]);
    });
    it("should decrease twice the benefit after expire", () => {
      expect(
        updateBenefitValue([{ name: "test", expiresIn: 0, benefit: 3 }])
      ).toEqual([{ name: "test", expiresIn: -1, benefit: 1 }]);
    });
    it("should never decrease benefit under zero", () => {
      // todo Error case : drug with negative benefit initialy added to the pharmacy
      expect(
        updateBenefitValue([{ name: "test", expiresIn: 0, benefit: 0 }])
      ).toEqual([{ name: "test", expiresIn: -1, benefit: 0 }]);
    });
    it("should never increase benefit over fifty", () => {
      expect(
        updateBenefitValue([{ name: "Herbal Tea", expiresIn: 0, benefit: 50 }])
      ).toEqual([{ name: "Herbal Tea", expiresIn: -1, benefit: 50 }]);
      expect(
        updateBenefitValue([{ name: "Herbal Tea", expiresIn: 15, benefit: 50 }])
      ).toEqual([{ name: "Herbal Tea", expiresIn: 14, benefit: 50 }]);
    });
  });
  describe("Particular behavior", () => {
    describe("Herbal Tea", () => {
      it("should increase the benefit before expire", () => {
        expect(
          updateBenefitValue([{ name: "Herbal Tea", expiresIn: 2, benefit: 3 }])
        ).toEqual([{ name: "Herbal Tea", expiresIn: 1, benefit: 4 }]);
      });
      it("should increase twice the benefit after expire", () => {
        expect(
          updateBenefitValue([{ name: "Herbal Tea", expiresIn: 0, benefit: 3 }])
        ).toEqual([{ name: "Herbal Tea", expiresIn: -1, benefit: 5 }]);
      });
    });
    describe("Magic Pill", () => {
      it("should never expires nor decreases in Benefit", () => {
        expect(
          updateBenefitValue([{ name: "Magic Pill", expiresIn: 15, benefit: 40 }])
        ).toEqual([{ name: "Magic Pill", expiresIn: 15, benefit: 40 }]);
        expect(
          updateBenefitValue([{ name: "Magic Pill", expiresIn: 0, benefit: 0 }])
        ).toEqual([{ name: "Magic Pill", expiresIn: 0, benefit: 0 }]);
        expect(
          updateBenefitValue([{ name: "Magic Pill", expiresIn: -1, benefit: -1 }])
        ).toEqual([{ name: "Magic Pill", expiresIn: -1, benefit: -1 }]);
      });
    });
    describe("Fervex", () => {
      it("should increase the benefit before expire", () => {
        expect(
          updateBenefitValue([{ name: "Fervex", expiresIn: 11, benefit: 3 }])
        ).toEqual([{ name: "Fervex", expiresIn: 10, benefit: 4 }]);
      });
      it("should increases by 2 when there are 10 days or less", () => {
        expect(
          updateBenefitValue([{ name: "Fervex", expiresIn: 10, benefit: 40 }])
        ).toEqual([{ name: "Fervex", expiresIn: 9, benefit: 42 }]);
        expect(
          updateBenefitValue([{ name: "Fervex", expiresIn: 6, benefit: 40 }])
        ).toEqual([{ name: "Fervex", expiresIn: 5, benefit: 42 }]);
      });
      it("should increases by 3 when there are 5 days or less", () => {
        expect(
          updateBenefitValue([{ name: "Fervex", expiresIn: 5, benefit: 40 }])
        ).toEqual([{ name: "Fervex", expiresIn: 4, benefit: 43 }]);
        expect(
          updateBenefitValue([{ name: "Fervex", expiresIn: 1, benefit: 40 }])
        ).toEqual([{ name: "Fervex", expiresIn: 0, benefit: 43 }]);
      });
      it("should drops Benefits to 0 after the expiration date", () => {
        expect(
          updateBenefitValue([{ name: "Fervex", expiresIn: 0, benefit: 40 }])
        ).toEqual([{ name: "Fervex", expiresIn: -1, benefit: 0 }]);
      });
    });
  });
});
