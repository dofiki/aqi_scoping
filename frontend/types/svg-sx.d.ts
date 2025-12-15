import React from "react";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

// Allow `sx` on basic SVG intrinsic elements (path, circle, g, svg, etc.)
// This only affects TypeScript typing; it does not change runtime behavior.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      path: React.DetailedHTMLProps<
        React.SVGProps<SVGPathElement>,
        SVGPathElement
      > & {
        sx?: SxProps<Theme>;
      };
      circle: React.DetailedHTMLProps<
        React.SVGProps<SVGCircleElement>,
        SVGCircleElement
      > & {
        sx?: SxProps<Theme>;
      };
      g: React.DetailedHTMLProps<React.SVGProps<SVGGElement>, SVGGElement> & {
        sx?: SxProps<Theme>;
      };
      svg: React.DetailedHTMLProps<
        React.SVGProps<SVGSVGElement>,
        SVGSVGElement
      > & {
        sx?: SxProps<Theme>;
      };
    }
  }
}

export {};
