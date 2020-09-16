/**
 * Represents a type which can release resources, such
 * as event listening or a timer.
 */
export interface IDisposable {
  disposed: boolean;

  /** Dispose this object */
  dispose(): any;
}
