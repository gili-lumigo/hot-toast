export class ToastConfig {
  position: ToastPosition = 'top-center';
  reverseOrder: boolean = false;
}

export type ToastType = 'success' | 'error' | 'loading' | 'blank';
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface IconTheme {
  primary: string;
  secondary: string;
}

export type ValueFunction<TValue, TArg> = (arg: TArg) => TValue;
export type ValueOrFunction<TValue, TArg> = TValue | ValueFunction<TValue, TArg>;

const isFunction = <TValue, TArg>(
  valOrFunction: ValueOrFunction<TValue, TArg>
): valOrFunction is ValueFunction<TValue, TArg> => typeof valOrFunction === 'function';

export const resolveValueOrFunction = <TValue, TArg>(valOrFunction: ValueOrFunction<TValue, TArg>, arg: TArg): TValue =>
  isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction;

export type Renderable = string | number | null;

export interface Toast {
  type: ToastType;
  id: string;
  message: ValueOrFunction<Renderable, Toast>;
  icon?: Renderable;
  duration?: number;
  pauseDuration: number;

  role: 'status' | 'alert';
  ariaLive: 'assertive' | 'off' | 'polite';

  style?: any;
  className?: string;
  iconTheme?: IconTheme;

  createdAt: number;
  visible: boolean;
  height?: number;
  width?: number;
}

export type ToastOptions = Partial<
  Pick<Toast, 'id' | 'icon' | 'duration' | 'role' | 'ariaLive' | 'className' | 'style' | 'iconTheme'>
>;

export interface HotToastServiceMethods {
  show: (message: string, options?: ToastOptions) => string;
}
