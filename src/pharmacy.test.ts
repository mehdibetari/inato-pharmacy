import { Pharmacy, Drug } from "./pharmacy";

describe("Pharmacy", () => {
  describe("Initial behavior", () => {
    it("should decrease the benefit and expiresIn", () => {
      expect(new Drug("test", 2, 3).updateBenefitValue().toJSON()).toEqual({
        name: "test",
        expiresIn: 1,
        benefit: 2,
      });
    });

    it("should decrease twice the benefit after expire", () => {
      expect(new Drug("test", 0, 3).updateBenefitValue().toJSON()).toEqual({
        name: "test",
        expiresIn: -1,
        benefit: 1,
      });
    });

    it("should never decrease benefit under zero", () => {
      // todo Error case : drug with negative benefit initialy added to the pharmacy
      expect(new Drug("test", 0, 0).updateBenefitValue().toJSON()).toEqual({
        name: "test",
        expiresIn: -1,
        benefit: 0,
      });

      expect(new Drug("Dafalgan", 0, 0).updateBenefitValue().toJSON()).toEqual({
        name: "Dafalgan",
        expiresIn: -1,
        benefit: 0,
      });

      expect(new Drug("Fervex", 0, 0).updateBenefitValue().toJSON()).toEqual({
        name: "Fervex",
        expiresIn: -1,
        benefit: 0,
      });
    });

    it("should never decrease benefit under zero with decrease by 2 or more", () => {
      expect(new Drug("test", 1, 1).updateBenefitValue().toJSON()).toEqual({
        name: "test",
        expiresIn: 0,
        benefit: 0,
      });

      expect(new Drug("Dafalgan", 1, 1).updateBenefitValue().toJSON()).toEqual({
        name: "Dafalgan",
        expiresIn: 0,
        benefit: 0,
      });
    });

    it("should never increase benefit over fifty", () => {
      expect(
        new Drug("Herbal Tea", 0, 50).updateBenefitValue().toJSON()
      ).toEqual({ name: "Herbal Tea", expiresIn: -1, benefit: 50 });

      expect(
        new Drug("Herbal Tea", 15, 50).updateBenefitValue().toJSON()
      ).toEqual({ name: "Herbal Tea", expiresIn: 14, benefit: 50 });
    });
  });

  describe("Particular behavior", () => {
    describe("Herbal Tea", () => {
      it("should increase the benefit before expire", () => {
        expect(
          new Drug("Herbal Tea", 2, 3).updateBenefitValue().toJSON()
        ).toEqual({ name: "Herbal Tea", expiresIn: 1, benefit: 4 });
      });

      it("should increase twice the benefit after expire", () => {
        expect(
          new Drug("Herbal Tea", 0, 3).updateBenefitValue().toJSON()
        ).toEqual({ name: "Herbal Tea", expiresIn: -1, benefit: 5 });
      });
    });

    describe("Magic Pill", () => {
      it("should never expires nor decreases in Benefit", () => {
        expect(
          new Drug("Magic Pill", 15, 40).updateBenefitValue().toJSON()
        ).toEqual({ name: "Magic Pill", expiresIn: 15, benefit: 40 });

        expect(
          new Drug("Magic Pill", 0, 0).updateBenefitValue().toJSON()
        ).toEqual({ name: "Magic Pill", expiresIn: 0, benefit: 0 });

        expect(
          new Drug("Magic Pill", -1, -1).updateBenefitValue().toJSON()
        ).toEqual({ name: "Magic Pill", expiresIn: -1, benefit: -1 });
      });
    });

    describe("Fervex", () => {
      it("should increase the benefit before expire", () => {
        expect(
          new Drug("Fervex", 11, 3).updateBenefitValue().toJSON()
        ).toEqual({ name: "Fervex", expiresIn: 10, benefit: 4 });
      });

      it("should increases by 2 when there are 10 days or less", () => {
        expect(
          new Drug("Fervex", 10, 40).updateBenefitValue().toJSON()
        ).toEqual({ name: "Fervex", expiresIn: 9, benefit: 42 });

        expect(
          new Drug("Fervex", 6, 40).updateBenefitValue().toJSON()
        ).toEqual({ name: "Fervex", expiresIn: 5, benefit: 42 });
      });

      it("should increases by 3 when there are 5 days or less", () => {
        expect(
          new Drug("Fervex", 5, 40).updateBenefitValue().toJSON()
        ).toEqual({ name: "Fervex", expiresIn: 4, benefit: 43 });

        expect(
          new Drug("Fervex", 1, 40).updateBenefitValue().toJSON()
        ).toEqual({ name: "Fervex", expiresIn: 0, benefit: 43 });
      });

      it("should drops Benefits to 0 after the expiration date", () => {
        expect(
          new Drug("Fervex", 0, 40).updateBenefitValue().toJSON()
        ).toEqual({ name: "Fervex", expiresIn: -1, benefit: 0 });
      });
    });

    describe("Dafalgan", () => {
      it("should decrease by 2 the benefit before expire", () => {
        expect(
          new Drug("Dafalgan", 2, 3).updateBenefitValue().toJSON()
        ).toEqual({ name: "Dafalgan", expiresIn: 1, benefit: 1 });
      });

      it("should decrease by 4 the benefit after expire", () => {
        expect(
          new Drug("Dafalgan", 0, 5).updateBenefitValue().toJSON()
        ).toEqual({ name: "Dafalgan", expiresIn: -1, benefit: 1 });
      });

      it("should decrease by 4 the benefit after expire", () => {
        expect(
          new Drug("Dafalgan", 0, 3).updateBenefitValue().toJSON()
        ).toEqual({ name: "Dafalgan", expiresIn: -1, benefit: 0 });
      });
    });
  });
});
