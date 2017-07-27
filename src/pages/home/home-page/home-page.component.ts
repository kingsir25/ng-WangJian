import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
/**
** 排序方向。
*/
type Direct = "asc" | "desc";

/**
** 排序属性。
** 
** @interface IPropertyOrder
*/
interface IPropertyOrder {            
    [name: string] : Direct;
}
/**
** 简单名/值对象。
** 
** @interface ISimpleObject
*/
interface ISimpleObject {
    [name: string] : string | number | boolean;
}

/**
** 对简单的名/值对象按照指定属性和排序方向进行排序（根据排序属性及排序方向，
** 对两个项依次进行比较，并返回代表排序位置的值）。
** 
** @template T 简单的名/值对象。
** @param {T} item1 排序比较项1。
** @param {T} item2 排序比较项2。
** @param {...IPropertyOrder[]} props 排序属性。
** @returns 若项1大于项2返回1，若项1等于项2返回0，否则返回-1。
*/
function SortByProps<T extends ISimpleObject>
(item1: T, item2: T, ...props: IPropertyOrder[]) {
    "use strict";
    var cps: Array<number> = []; // 存储排序属性比较结果。
    // 如果未指定排序属性，则按照全属性升序排序。    
    var asc = true;
    if (props.length < 1) {
        for (var p in item1) {
            if (item1[p] > item2[p]) {
                cps.push(1);
                break; // 大于时跳出循环。
            } else if (item1[p] === item2[p]) {
                cps.push(0);
            } else {
                cps.push(-1);
                break; // 小于时跳出循环。
            }
        }
    } else { // 按照指定属性及升降方向进行排序。
        for (var i = 0; i < props.length; i++) {
            var prop = props[i];
            for (var o in prop) {
                asc = prop[o] === "asc";
                if (item1[o] > item2[o]) {
                    cps.push(asc ? 1 : -1);
                    break; // 大于时跳出循环。
                } else if (item1[o] === item2[o]) {
                    cps.push(0);
                } else {
                    cps.push(asc ? -1 : 1);
                    break; // 小于时跳出循环。
                }
            }
        }
    }

    for (var j = 0; j < cps.length; j++) {
        if (cps[j] === 1 || cps[j] === -1) {
            return cps[j];
        }
    }
    return 0;    
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  users:Array<any> = [
    {"index":16,
    "name":"南瓜",
    "spec":"kg",
      "price":"￥2.00",
      "num":10,
      "Place":"东京",
      "timelimit":"1个月",
      "P_date":"2017-06-31",
      "Radomid":0},
      {"index":7,
      "name":"西瓜",
      "spec":"kg",
      "price":"￥3.00",
      "num":10,
      "Place":"北京",
      "timelimit":"2个月",
      "P_date":"2017-05-31",
      "Radomid":0},
      {"index":14,
      "name":"黄瓜",
      "spec":"kg",
      "price":"￥4.00",
      "num":10,
      "Place":"南京",
      "timelimit":"3个月",
      "P_date":"2017-02-31",
      "Radomid":0},
  ]
deleteLast(){
  this.users.pop()
}
saveNewUser(){
  this.users.push({
     "index":888,
      "name":"冬瓜",
      "spec":"kg",
      "price":"￥9.00",
      "num":10,
      "Place":"大连",
      "timelimit":"3个月",
      "P_date":"2017-01-31",
      "Radomid":0
  })
}

sortByAsccending(salt="index"){
this.users.sort(function(a,b){
return a[salt] - b[salt];
})
}
  // sortByAsccending(){
  //   // 参考MDN Array操作的API文档 Array相关方法方法
  // this.test({ "index": "asc"})
  // }

  sortByDesccending(){
    // 参考MDN Array操作的API文档 Array相关方法
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array
    this.test({ "index": "desc"})
  }
  sortByRadomB(){
    // 参考MDN Array操作的API文档 Math相关方法
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
    for (let entry of this.users){
     entry.Radomid= Math.random()* this.users.length;
    }
  }

sortByRadom(){
// 参考MDN Array操作的API文档 Math相关方法
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
function shuffle(a) {
for (let i = a.length; i; i--) {
let j = Math.floor(Math.random() * i);
[a[i - 1], a[j]] = [a[j], a[i - 1]];
}
}
shuffle(this.users);
}  


  test(propOrders) {
        this.users.sort(function (a, b) {
            return SortByProps(a, b, propOrders);
        });
        console.log(this.users);
    }

  constructor(meta: Meta, title: Title) {
    title.setTitle('My Home Page');

    meta.addTags([ 
      {
        name: 'author', content: 'eddic'
      },
      {
        name: 'keywords', content: 'angular 4 tutorial, angular seo'
      },
      {
        name: 'description', content: 'This is my great description.'
      },
    ])
  }

  ngOnInit() {
  }








}
