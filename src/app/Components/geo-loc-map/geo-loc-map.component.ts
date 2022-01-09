import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as feature from 'topojson';
import { Countries } from './countries';
import { WeatherDataService } from '../../Services/weather-data.service';

@Component({
  selector: 'app-geo-loc-map',
  templateUrl: './geo-loc-map.component.html',
  styleUrls: ['./geo-loc-map.component.scss']
})
export class GeoLocMapComponent implements OnInit {
  mapFeatures: any;
  countries: Object[] = new Countries().countries;
  countryCities: Object[] = new Countries().countryCities;

  svg: any;
  paths: any;
  g: any;
  width: number = 620;
  height: number = 400;
  countryCoords: any = [];

  constructor(public getWeather: WeatherDataService) {

  }

  public ngOnInit() {
    this.createMap();
  }

  createMap() {
      let coords: any;
      const projection = d3.geoMercator()
        .translate([ this.width / 2, this.height / 2])
        .scale(100);

      d3.json('../../assets/world.topojson')
      .then((topology: any) => {
        const pathGenerator = d3.geoPath().projection(projection);
        const { countries } = topology.objects;
        this.mapFeatures = feature.feature(topology, countries);
        const countriesGeometry = this.mapFeatures.features;

        this.svg = d3.select('#wrapper')
        
        const dynamicWidth = (document.getElementById('mapContainer')?.clientWidth as number) / 4;
        this.svg
        .append('svg')
        .attr('width', '100%')
        .attr('height', this.height)
        .attr('position', 'relative')
        .append('g')
        .attr('position', 'relative')
        .attr('transform', 'translate(' + dynamicWidth + ')' )
        .selectAll('path')
        .data(countriesGeometry)
        .enter()
        .append('path')
        .attr('class', 'country')
        .attr('margin', 'auto')

        .attr('d', ( d: any) => pathGenerator(d))
        .attr('stroke', '#171c20')
        .attr('cursor', 'pointer')
        .attr('stroke-width', '0.1')
        .attr('fill', 'white')
        .on('mouseover', (d: any) => {
          d.target.style.fill = '#e1e1e1';
        })
        .on('mouseout', (d: any) => {
          if(d.target.style.fill !== 'red') {
            d.target.style.fill = 'white';
          }
        })
        .on('click', (event: any, country: any ) => {
          console.log(event.target.parentElement)
          d3.selectAll('.country').style('fill', 'white')
          event.target.style.fill = 'red'

          this.countryCities.forEach( ( (d:any) => {
            if(d.id === country.id) {
              coords = d;
            }
          }));
          d3.select('#countryDetails')
          .selectChildren()
          .remove();
          d3.select('#countryDetails')
          .append('div')  
          .attr('top', 400)
          .text(country.properties.name)
          .attr('position', 'absolute')
          .attr('z-index', 3000)

          d3.select('#countryDetails')
          .append('hr')
          .attr('background-color', 'white')
          .attr('color', 'red')
          .attr('width', '100%')
          .attr('height', '1px');

          this.countryCoords.length = 0;

          coords.cities.forEach( (element: any) => {
            console.log(element);
            this.countryCoords.push( element );
            d3.select('#countryDetails')
            .append('div')
            .style('font-size', '.8rem')
            .style('margin-bottom', '.3rem')
            .style('cursor', 'pointer')
            .text(element.city)
            .on('mouseover', (el: any) => {
              el.target.style.color = '#eee';
            })
            .on('mouseout', (el: any) => {
              el.target.style.color = 'white';
            })
            .on('click', ((el) => {
              el.target.style.color = 'red';
              let countryLocation = el.srcElement.innerText;

              this.countryCoords.forEach( (element: any) => {
                if(countryLocation === element.city) {
                  let queryCoordinates = element.coords; // TODO make http get request
                  console.log(queryCoordinates);
                  this.getWeather.latitude = queryCoordinates.lat;
                  this.getWeather.latitude = queryCoordinates.lon;

                  this.getWeather.getForeCastNew(queryCoordinates.lat, queryCoordinates.lon);
                  this.getWeather.getLocationNameNew(queryCoordinates.lat, queryCoordinates.lon);
                }
              });
            }))
          });
        });
        this.svg.call(this.zoom);
      });
  }

  zoom = d3.zoom()
    .scaleExtent([1.1, 40])
    .translateExtent([[0, -80],[this.width, this.height]])
    .on('zoom', (event) => {

      this.svg.selectAll('g')
      .attr('transform', event.transform)
    });
}
