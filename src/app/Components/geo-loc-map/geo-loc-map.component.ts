import { Component, AfterViewInit, HostListener, OnInit, OnChanges } from '@angular/core';
import * as d3 from 'd3';
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
  g: any;

  public ngOnInit() {
    this.createMap();
  }

  public ngOnChanges() {
    // this.paths.call(this.zoom);

  }

  createMap() {
    console.log('running')

      const country2: any[] = new Countries().countries;
      const countryCities: any[] = new Countries().countryCities;

      let country = '';
      const width = 620;
      const height = 396;

      this.svg = d3.select('#wrapper');
      
      const projection = d3.geoMercator()
        .translate([ width / 2, height / 2])
        .scale(100);

      d3.json('../../assets/world.topojson')
      .then((topology: any) => {
        
        let pathGenerator = d3.geoPath().projection(projection);
        const { countries } = topology.objects;
        this.mapFeatures = feature.feature(topology, countries);
        let countriesGeometry = this.mapFeatures.features;

        this.paths = d3.select('#wrapper')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '396px')
        .attr('position', 'relative')
          .selectAll('path')
          .data(countriesGeometry)
        .enter()
        .append('path')
        .attr('class', 'country')
        .attr('d', ( d: any) => pathGenerator(d))
        .attr('stroke', '#171c20')
        .attr('cursor', 'pointer')
        .attr('stroke-width', '0.1')
        .attr('fill', 'white')
        .on('mouseover', (d) => {
          d.target.style.fill = 'red';
        })
        .on('mouseout', (d) => {
          d.target.style.fill = 'white';
        })
        this.paths.call(this.zoom);
      });
  }

  zoom = d3.zoom()
    .scaleExtent([1, 40])
    .on('zoom', (event) => {
      console.log(event);
      
      this.paths.selectAll('g').attr('transform', event.transform.k)
    });
}
