export class ForbiddenLandsD6 extends Die {
  constructor(termData) {
    termData.faces = 6;
    super(termData);
  }

  static DENOMINATION = 6;

  static getResultLabel(result) {
    return `<img src="systems/forbidden-lands/chat/dice/skill-d6-${result}.png" alt="${result}" title="${result}" />`;
  }
}

export class BaseDie extends ForbiddenLandsD6 {
  static DENOMINATION = "b";

  static getResultLabel(result) {
    return `<img src="systems/forbidden-lands/chat/dice/base-d6-${result}.png" alt="${result}" title="${result}" />`;
  }
}

export class GearDie extends ForbiddenLandsD6 {
  static DENOMINATION = "g";

  static getResultLabel(result) {
    return `<img src="systems/forbidden-lands/chat/dice/gear-d6-${result}.png" alt="${result}" title="${result}" />`;
  }
}

export class SkillDie extends ForbiddenLandsD6 {
  static DENOMINATION = "s";
}

export class ArtifactD8 extends Die {
  constructor(termData) {
    termData.faces = 8;
    super(termData);
  }

  static DENOMINATION = 8;

  static getResultLabel(result) {
    return `<img src="systems/forbidden-lands/chat/dice/artifact-d8-${result}.png" alt="${result}" title="${result}" />`;
  }
}

export class ArtifactD10 extends Die {
  constructor(termData) {
    termData.faces = 10;
    super(termData);
  }

  static DENOMINATION = 10;

  static getResultLabel(result) {
    return `<img src="systems/forbidden-lands/chat/dice/artifact-d10-${result}.png" alt="${result}" title="${result}" />`;
  }
}

export class ArtifactD12 extends Die {
  constructor(termData) {
    termData.faces = 12;
    super(termData);
  }

  static DENOMINATION = 12;

  static getResultLabel(result) {
    return `<img src="systems/forbidden-lands/chat/dice/artifact-d12-${result}.png" alt="${result}" title="${result}" />`;
  }
}

// Export Hooks to Config
export function registerDice() {
  CONFIG.Dice.terms.b = BaseDie;
  CONFIG.Dice.terms.g = GearDie;
  CONFIG.Dice.terms.s = SkillDie;
  CONFIG.Dice.terms["6"] = ForbiddenLandsD6;
  CONFIG.Dice.terms["8"] = ArtifactD8;
  CONFIG.Dice.terms["10"] = ArtifactD10;
  CONFIG.Dice.terms["12"] = ArtifactD12;
}
