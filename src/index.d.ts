/* eslint-disable @typescript-eslint/ban-types */
import { Settings } from "@gi-ts/gio2";
import { MixerControl } from "@gi-ts/gvc1";

export {};

declare global {
  export const imports: {
    lang: any;
    ui: {
      layout: any;
      lightbox: any;
      messageTray: any;
      main: {
        notify: (text: string, body: string) => void;
        messageTray: {
          add(source: any): any;
        };
        panel: any;
        wm: any;
        layoutManager: {
          monitors: Monitor[];
          primaryIndex: number;
          addChrome(param: any, options?: any): any;
          removeChrome(param: any): any;
          addTopChrome(param: any, options?: any): any;
        };
        uiGroup: any;
        extensionManager: any;
      };
      panelMenu: any;
      popupMenu: any;
      modalDialog: any;
      dialog: any;
      switcherPopup: {
        SwitcherPopup: any;
      };
      status: {
        volume: {
          getMixerControl(): MixerControl;
        };
      };
    };
    misc: {
      util: {
        wiggle(
          actor: any,
          {
            offset,
            duration,
            wiggleCount,
          }: { offset?: number; duration?: number; wiggleCount?: number }
        ): void;
      };
      extensionUtils: {
        initTranslations: (domain: string) => void;
        getCurrentExtension: () => any;
        openPrefs: () => void;
        getSettings: (id: string) => Settings;
      };
      config: any;
    };
    byteArray: {
      fromString: (input: string) => Uint8Array;
      fromArray: (input: number[]) => any;
      fromGBytes: (input: any) => Uint8Array;
      toString: (x: Uint8Array) => string;
    };
    gettext: any;
  };
  export interface Monitor {
    width: number;
    height: number;
    x: number;
    y: number;
  }

  export const log: (arg: any) => void;
}

type AnimatableActorFields =
  | "fixed_x"
  | "fixed_y"
  | "height"
  | "margin_bottom"
  | "margin_left"
  | "margin_right"
  | "margin_top"
  | "min_height"
  | "min_width"
  | "natural_height"
  | "natural_width"
  | "opacity"
  | "pivot_point_z"
  | "rotation_angle_x"
  | "rotation_angle_y"
  | "rotation_angle_z"
  | "scale_x"
  | "scale_y"
  | "scale_z"
  | "translation_x"
  | "translation_y"
  | "translation_z"
  | "width"
  | "x"
  | "y"
  | "z_position";

interface EasingParams {
  // milliseconds
  duration: number;
  // milliseconds
  delay?: number;
  mode?: any;
  repeatCount?: number;
  autoReverse?: boolean;
  onComplete?: () => void;
  onStopped?: (isFinished: boolean) => void;
}

// Any number of extra fields for the properties to be animated (e.g. "opacity: 0").
interface EasingParamsWithProperties
  extends EasingParams,
    Partial<Pick<any, AnimatableActorFields>> {}

declare module "@gi-ts/clutter10" {
  interface Actor {
    ease(params: EasingParamsWithProperties): void;
  }
}

declare module "@gi-ts/st1" {
  interface Adjustment {
    ease(target: any, params: EasingParamsWithProperties): void;
  }
}

declare module "@gi-ts/gobject2" {
  export interface MetaInfo {
    GTypeName: string;
    GTypeFlags?: TypeFlags;
    Implements?: Function[];
    Properties?: { [K: string]: ParamSpec };
    Signals?: { [K: string]: SignalDefinition };
    Requires?: Function[];
    CssName?: string;
    Template?: string;
    Children?: string[];
    InternalChildren?: string[];
  }
}
