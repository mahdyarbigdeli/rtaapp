import { Map } from "leaflet";
import { ReactElement } from "react";


export interface ISearchResponse {
  x: number;
  y: number;
  label: string;
  bounds: number[][];
  raw: IPlace;
}

interface IPlace {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: string[];
}

export interface ISearchLocationByTitleProps {
  title: string;
  flyTo?: boolean;
}


export interface ICordination {
  lat: number;
  lng: number;
  lon?: number;
  title?: string;
}

export interface IShape {
  key: string;
  points: ICordination[];
  popUp?: {
    label?: string;
    events?: {
      onClick?: () => void;
    };
  };
}

export interface ILocationControllerType {
  locations: ICordination[];
  onDelete?: (target: ICordination) => void;
  onClick?: (target: ICordination) => void;
  onSubmit: (contidnations: ICordination[]) => void;
  onCancel: (contidnations: ICordination[]) => void;
  isValidToSubmit?: boolean;
  buttons: {
    cancel: boolean;
    submit: boolean;
    delete: boolean;
  };
}

export interface INewLocationControllerType {
  locations: ICordination[];
  events: {
    onDelete?: (target: ICordination) => void;
    onClick?: (target: ICordination) => void;
    onSubmit: (contidnations: ICordination[]) => void;
    onCancel: (contidnations: ICordination[]) => void;
  };
  isValidToSubmit?: boolean;
  buttons: {
    cancel: boolean;
    submit: boolean;
    delete: boolean;
  };
}

// Map Mode Single
export interface IMapModeSingle {
  intialPositions: ICordination[];
  markerShape?: JSX.Element;
  selectCount: number;
  events: {
    onSelectLocations: (cordinations: ICordination[]) => void;
    onSubmit: (cordinations: ICordination[]) => void;
    onCancel: (cordinations: ICordination[]) => void;
  };
  controllerPlugin?: INewLocationControllerType;
  mode: "show" | "get" | "both";
}

// Map Mode Shape
export interface IMapModeShape {
  intialShapes: IShape[];
  shapeCounts: number;
  events: {
    onCreatedShape: (data: IShape[]) => void;
    onEditedShape?: (data: IShape[]) => void;
    onDeletedShape?: (data: IShape[]) => void;
    onBeforeCreateShape?: (data: IShape[]) => IShape[];
  };
  controllerPlugin?: INewLocationControllerType;
  mode: "show" | "get" | "both";
}

// Search Component
export interface ISearchConfig {
  allowSearch?: boolean;
  initialValue?: string;
  onChange?: (value: string | null) => void;
}

// Single Location config
export interface ILocationMarkerConfig {
  intialPositions: ICordination[];
  markerShape?: JSX.Element;
  selectCount: number;
}

// Showing - Updating - Getting
export type IMode = "show" | "get" | "edit";

export interface ISelectLocationModal {
  configs: {
    mapInitialPosition: ICordination;
    zoom: number;
    shapeModeConfig?: IMapModeShape;
    locationMarkerConfig?: ILocationMarkerConfig;
    searchConfig?: ISearchConfig;
    disableHelper?: boolean;
  };
  singleMap?: IMapModeSingle;
  shapeMap?: IMapModeShape;
  mapRef?: (map: Map) => void;
  children?: ReactElement;
}
