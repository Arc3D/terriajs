import TerriaError from "../Core/TerriaError";
import { BaseModel } from "../Models/Model";
import StratumFromTraits from "../Models/StratumFromTraits";
import ModelTraits from "./ModelTraits";
import Trait, { TraitOptions } from "./Trait";

type PrimitiveType = "string" | "number" | "boolean";

export interface PrimitiveArrayTraitOptions<T> extends TraitOptions {
  type: PrimitiveType;
  isNullable?: boolean;
}

export default function primitiveArrayTrait<T>(
  options: PrimitiveArrayTraitOptions<T>
) {
  return function(target: any, propertyKey: string) {
    const constructor = target.constructor;
    if (!constructor.traits) {
      constructor.traits = {};
    }
    constructor.traits[propertyKey] = new PrimitiveArrayTrait(
      propertyKey,
      options
    );
  };
}

export class PrimitiveArrayTrait<T> extends Trait {
  readonly type: PrimitiveType;
  readonly isNullable: boolean;

  constructor(id: string, options: PrimitiveArrayTraitOptions<T>) {
    super(id, options);
    this.type = options.type;
    this.isNullable = options.isNullable || false;
  }

  getValue(strataTopToBottom: StratumFromTraits<ModelTraits>[]): T | undefined {
    for (let i = 0; i < strataTopToBottom.length; ++i) {
      const stratum: any = strataTopToBottom[i];
      const value = stratum[this.id];
      if (value !== undefined) {
        return value;
      }
    }

    return undefined;
  }

  fromJson(model: BaseModel, stratumName: string, jsonValue: any): T[] {
    if (!this.isValidJson(jsonValue)) {
      throw new TerriaError({
        title: "Invalid property",
        message: `Property ${this.id} is expected to be of type ${this.type}[].`
      });
    }

    return jsonValue;
  }

  isSameType(trait: Trait): boolean {
    return (
      trait instanceof PrimitiveArrayTrait &&
      trait.type === this.type &&
      trait.isNullable === this.isNullable
    );
  }

  private isValidJson(jsonValue: any): boolean {
    if (jsonValue === null && this.isNullable) {
      return true;
    }

    if (!Array.isArray(jsonValue)) {
      return false;
    }

    return jsonValue.every(item => typeof item === this.type);
  }
}
