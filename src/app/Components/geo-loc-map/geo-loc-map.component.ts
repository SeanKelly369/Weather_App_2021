import { Component, OnInit, OnChanges } from '@angular/core';
import * as d3 from 'd3';
import { selectAll } from 'd3';
import * as feature from 'topojson';
import { Countries } from './countries';

@Component({
  selector: 'app-geo-loc-map',
  templateUrl: './geo-loc-map.component.html',
  styleUrls: ['./geo-loc-map.component.scss']
})
export class GeoLocMapComponent implements OnInit, OnChanges {
  name = 'd3';
  mapFeatures: any;
  airports: any;
  nodeSelection: any;
  countries: any[] = new Countries().countries;
  scaledInitial = 1;
  zoomValue: any = 1;
  event!: MouseEvent;

  svg: any;
  paths: any;
  child: any;
  g: any;
  width: number = 620;
  height: number = 400;

  public ngOnInit() {
    this.createMap();
  }

  public ngOnChanges() {
    this.paths.call(this.zoom);

  }

  createMap() {

      const country2: any[] = new Countries().countries;
      const countryCities: any[] = new Countries().countryCities;

      let country = '';
      
      const projection = d3.geoMercator()
        .translate([ this.width / 2, this.height / 2])
        .scale(100);

      d3.json('../../assets/world.topojson')
      .then((topology: any) => {
        const pathGenerator = d3.geoPath().projection(projection);
        const { countries } = topology.objects;
        this.mapFeatures = feature.feature(topology, countries);
        const countriesGeometry = this.mapFeatures.features;

        this.svg = d3.select('#wrapper').attr('transformX', this.width/2)
        .attr('right', '300px');

        this.svg
        .append('svg')
        .attr('width', '100%')
        .attr('height', this.height)
        .attr('position', 'relative')
        .append('g')
        .attr('position', 'relative')
        // .attr('x', '-200')
        .attr('transform', `translate(${this.width / 2}, 0)`)
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
          d.target.style.fill = '#f1f1f1';
        })
        .on('mouseout', (d: any) => {
          d.target.style.fill = 'white';
        })
        .on('click', (d: any) => {
          console.log(d);
          console.log(d.target.__data__.properties.name);
          console.log(d.target.__data__.id);
        });

        this.svg.call(this.zoom);
      });
  }

  zoom = d3.zoom()
    .scaleExtent([1, 40])
    .translateExtent([[0, -80],[this.width, this.height]])
    .on('zoom', (event) => {

      this.svg.selectAll('g')
      .attr('transform', event.transform)
    });
}
