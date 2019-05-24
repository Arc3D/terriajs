import { ObservableMap } from "mobx";
import DeveloperError from "terriajs-cesium/Source/Core/DeveloperError";
import CommonStrata from "./CommonStrata";

const million = 1000000;

/**
 * Defines the relative ordering of strata.
 */
export default class StratumOrder {
  /**
   * The priorities of each named stratum. Stata with higher priority values are "above" and override
   * strata with lower priority values.
   */
  readonly priorities = new ObservableMap<string, number>();

  /**
   * The next priority to assign to a load stratum.
   */
  nextLoad: number = 1 * million;

  /**
   * The next priority to assign to a definition stratum.
   */
  nextDefinition: number = 2 * million;

  /**
   * The next priority to assign to a user stratum.
   */
  nextUser: number = 3 * million;

  constructor() {
    this.addDefinitionStratum(CommonStrata.defaults);
    this.addDefinitionStratum(CommonStrata.inheritedFromParentGroup);
    this.addDefinitionStratum(CommonStrata.definition);
    this.addUserStratum(CommonStrata.user);
  }

  /**
   * Assigns a priority to a load stratum. If the stratum already has a priority, this function does nothing.
   * @param id The ID of the stratum.
   */
  addLoadStratum(id: string) {
    if (this.priorities.get(id) === undefined) {
      this.priorities.set(id, this.nextLoad);
      this.nextLoad += 10;
    }
  }

  /**
   * Assigns a priority to a definition stratum. If the stratum already has a priority, this function does nothing.
   * @param id The ID of the stratum.
   */
  addDefinitionStratum(id: string) {
    if (this.priorities.get(id) === undefined) {
      this.priorities.set(id, this.nextDefinition);
      this.nextDefinition += 10;
    }
  }

  /**
   * Assigns a priority to a user stratum. If the stratum already has a priority, this function does nothing.
   * @param id The ID of the stratum.
   */
  addUserStratum(id: string) {
    if (this.priorities.get(id) === undefined) {
      this.priorities.set(id, this.nextUser);
      this.nextUser += 10;
    }
  }

  /**
   * Sorts the given strata in top-to-bottom order so that strata with a higher priority value occur
   * earlier in the returned array.
   * @param strata The strata to sort.
   * @returns The strata sorted top-to-bottom.
   */
  sortTopToBottom<T>(strata: Map<string, T>): T[] {
    return this.sort(strata, (a, b) => {
      const aPriority = this.priorities.get(a[0]);
      if (aPriority === undefined) {
        throw new DeveloperError(
          `Stratum ${a[0]} does not exist in StratumOrder.`
        );
      }
      const bPriority = this.priorities.get(b[0]);
      if (bPriority === undefined) {
        throw new DeveloperError(
          `Stratum ${b[0]} does not exist in StratumOrder.`
        );
      }

      return bPriority - aPriority;
    });
  }

  /**
   * Sorts the given strata in top-to-bottom order so that strata with a higher priority value occur
   * later in the returned array.
   * @param strata The strata to sort.
   * @returns The strata sorted bottom-to-top.
   */
  sortBottomToTop<T>(strata: Map<string, T>): T[] {
    return this.sort(strata, (a, b) => {
      const aPriority = this.priorities.get(a[0]);
      if (aPriority === undefined) {
        throw new DeveloperError(
          `Stratum ${a[0]} does not exist in StratumOrder.`
        );
      }
      const bPriority = this.priorities.get(b[0]);
      if (bPriority === undefined) {
        throw new DeveloperError(
          `Stratum ${b[0]} does not exist in StratumOrder.`
        );
      }

      return aPriority - aPriority;
    });
  }

  private sort<T>(
    strata: Map<string, T>,
    sortFunction: (a: [string, T], b: [string, T]) => number
  ): T[] {
    return Array.from(strata.entries())
      .sort(sortFunction)
      .map(e => e[1]);
  }

  static readonly instance = new StratumOrder();

  /**
   * Assigns a priority to a load stratum. If the stratum already has a priority, this function does nothing.
   * @param id The ID of the stratum.
   */
  static addLoadStratum(id: string) {
    StratumOrder.instance.addLoadStratum(id);
  }

  /**
   * Assigns a priority to a definition stratum. If the stratum already has a priority, this function does nothing.
   * @param id The ID of the stratum.
   */
  static addDefinitionStratum(id: string) {
    StratumOrder.instance.addDefinitionStratum(id);
  }

  /**
   * Assigns a priority to a user stratum. If the stratum already has a priority, this function does nothing.
   * @param id The ID of the stratum.
   */
  static addUserStratum(id: string) {
    StratumOrder.instance.addUserStratum(id);
  }

  /**
   * Sorts the given strata in top-to-bottom order so that strata with a higher priority value occur
   * earlier in the returned array.
   * @param strata The strata to sort.
   * @returns The strata sorted top-to-bottom.
   */
  static sortTopToBottom<T>(strata: Map<string, T>): T[] {
    return StratumOrder.instance.sortTopToBottom<T>(strata);
  }

  /**
   * Sorts the given strata in top-to-bottom order so that strata with a higher priority value occur
   * later in the returned array.
   * @param strata The strata to sort.
   * @returns The strata sorted bottom-to-top.
   */
  static sortBottomToTop<T>(strata: Map<string, T>): T[] {
    return StratumOrder.instance.sortBottomToTop<T>(strata);
  }
}
