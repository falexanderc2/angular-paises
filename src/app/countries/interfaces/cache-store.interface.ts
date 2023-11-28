import { Country } from "./country"
import { TRegion } from "./region.type"

export interface ICacheStore {
  byCapital: ITermCountries
  byCountries: ITermCountries
  byRegion: IRegionCountries

}

export interface ITermCountries {
  term: string
  countries: Country[]
}

export interface IRegionCountries {
  region?: TRegion
  countries: Country[]
}