function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done)resolve(value);else Promise.resolve(value).then(_next,_throw)}
function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(undefined)})}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function");}
function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}
function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);Object.defineProperty(Constructor,"prototype",{writable:false});return Constructor}var LineHighlighter=InteractiveExample.LineHighlighter;var Timer=InteractiveExample.Timer;var initExamples=InteractiveExample.initExamples;var VisualGraph=InteractiveExample.VisualGraph;var firstGraph=new VisualGraph("first-graph");
firstGraph.addVertex("A",215,0);firstGraph.addVertex("B",50,50);firstGraph.addVertex("C",50,100);firstGraph.addVertex("D",215,150);firstGraph.addVertex("E",380,50);firstGraph.addVertex("F",380,100);firstGraph.addVertex("G",280,75);firstGraph.addEdge("A","B");firstGraph.addEdge("B","C");firstGraph.addEdge("C","D");firstGraph.addEdge("D","F");firstGraph.addEdge("F","E");firstGraph.addEdge("E","A");firstGraph.addEdge("B","D");firstGraph.addEdge("D","G");firstGraph.addEdge("G","F");
firstGraph.addEdge("A","G");var weightedGraph=new VisualGraph("weighted-graph");weightedGraph.addVertex("A",215,0);weightedGraph.addVertex("B",145,50);weightedGraph.addVertex("C",40,110);weightedGraph.addVertex("D",215,150);weightedGraph.addVertex("E",390,40);weightedGraph.addVertex("F",300,110);weightedGraph.addEdge("C","D",20);weightedGraph.addEdge("B","D",15);weightedGraph.addEdge("B","F",17);weightedGraph.addEdge("D","F",7);weightedGraph.addEdge("A","B",8);weightedGraph.addEdge("A","E",10);
var directedGraph=new VisualGraph("directed-graph");directedGraph.addVertex("A",215,0);directedGraph.addVertex("B",50,50);directedGraph.addVertex("C",135,100);directedGraph.addVertex("D",215,150);directedGraph.addVertex("E",310,50);directedGraph.addVertex("F",380,100);directedGraph.addEdge("B","A",null,true);directedGraph.addEdge("B","C",null,true);directedGraph.addEdge("B","E",null,true);directedGraph.addEdge("D","E",null,true);directedGraph.addEdge("F","D",null,true);
directedGraph.addEdge("F","E",null,true);var adjacencyMatrixGraph=new VisualGraph("adjacency-matrix-graph");adjacencyMatrixGraph.addVertex("A",190,0);adjacencyMatrixGraph.addVertex("B",370,30);adjacencyMatrixGraph.addVertex("C",410,85);adjacencyMatrixGraph.addVertex("D",300,125);adjacencyMatrixGraph.addVertex("E",110,150);adjacencyMatrixGraph.addVertex("F",20,60);adjacencyMatrixGraph.addEdge("A","B");adjacencyMatrixGraph.addEdge("B","C");adjacencyMatrixGraph.addEdge("C","D");
adjacencyMatrixGraph.addEdge("D","E");adjacencyMatrixGraph.addEdge("E","F");adjacencyMatrixGraph.addEdge("F","A");var adjacencyListArrayGraph=new VisualGraph("adjacency-list-array-graph");adjacencyListArrayGraph.addVertex("0",190,0);adjacencyListArrayGraph.addVertex("1",370,30);adjacencyListArrayGraph.addVertex("2",410,85);adjacencyListArrayGraph.addVertex("3",300,125);adjacencyListArrayGraph.addVertex("4",110,150);adjacencyListArrayGraph.addVertex("5",20,60);adjacencyListArrayGraph.addEdge("0","1");
adjacencyListArrayGraph.addEdge("1","2");adjacencyListArrayGraph.addEdge("2","3");adjacencyListArrayGraph.addEdge("3","4");adjacencyListArrayGraph.addEdge("4","5");adjacencyListArrayGraph.addEdge("5","0");var adjacencyListHashMapGraph=new VisualGraph("adjacency-list-hash-map-graph");adjacencyListHashMapGraph.addVertex("A",190,0);adjacencyListHashMapGraph.addVertex("B",370,30);adjacencyListHashMapGraph.addVertex("C",410,85);adjacencyListHashMapGraph.addVertex("D",300,125);
adjacencyListHashMapGraph.addVertex("E",110,150);adjacencyListHashMapGraph.addVertex("F",20,60);adjacencyListHashMapGraph.addEdge("A","B");adjacencyListHashMapGraph.addEdge("B","C");adjacencyListHashMapGraph.addEdge("C","D");adjacencyListHashMapGraph.addEdge("D","E");adjacencyListHashMapGraph.addEdge("E","F");adjacencyListHashMapGraph.addEdge("F","A");
var Graph=function(){function Graph(){_classCallCheck(this,Graph);this.adjacencyList={}}_createClass(Graph,[{key:"addVertex",value:function addVertex(vertex){if(!this.adjacencyList[vertex])this.adjacencyList[vertex]=[]}},{key:"addEdge",value:function addEdge(v1,v2){if(!this.adjacencyList[v1]||!this.adjacencyList[v2])return;if(!this.adjacencyList[v1].includes(v2))this.adjacencyList[v1].push(v2);if(!this.adjacencyList[v2].includes(v1))this.adjacencyList[v2].push(v1)}},{key:"removeEdge",value:function removeEdge(v1,
v2){if(!this.adjacencyList[v1]||!this.adjacencyList[v2])return;var index=this.adjacencyList[v1].findIndex(function(val){return val===v2});if(index!==-1)this.adjacencyList[v1].splice(index,1);index=this.adjacencyList[v2].findIndex(function(val){return val===v1});if(index!==-1)this.adjacencyList[v2].splice(index,1)}}]);return Graph}();
var config=[{exampleId:1,lineHighlighter:new LineHighlighter("code-1"),visualGraph:new VisualGraph("graph-1"),timer:new Timer,code:function(){var _code=_asyncToGenerator(regeneratorRuntime.mark(function _callee(){var proceed;return regeneratorRuntime.wrap(function _callee$(_context){while(1)switch(_context.prev=_context.next){case 0:this.lineHighlighter.highlight(14);_context.next=3;return this.timer.wait(500);case 3:proceed=_context.sent;if(proceed){_context.next=6;break}return _context.abrupt("return");
case 6:this.lineHighlighter.clear();this.visualGraph.addVertex("A",215,0);this.lineHighlighter.highlight(6);_context.next=11;return this.timer.wait(500);case 11:proceed=_context.sent;if(proceed){_context.next=14;break}return _context.abrupt("return");case 14:this.lineHighlighter.clear();this.lineHighlighter.highlight(14);_context.next=18;return this.timer.wait(500);case 18:proceed=_context.sent;if(proceed){_context.next=21;break}return _context.abrupt("return");case 21:this.lineHighlighter.clear();
this.lineHighlighter.highlight(15);_context.next=25;return this.timer.wait(500);case 25:proceed=_context.sent;if(proceed){_context.next=28;break}return _context.abrupt("return");case 28:this.lineHighlighter.clear();this.visualGraph.addVertex("B",50,50);this.lineHighlighter.highlight(6);_context.next=33;return this.timer.wait(500);case 33:proceed=_context.sent;if(proceed){_context.next=36;break}return _context.abrupt("return");case 36:this.lineHighlighter.clear();this.lineHighlighter.highlight(15);
_context.next=40;return this.timer.wait(500);case 40:proceed=_context.sent;if(proceed){_context.next=43;break}return _context.abrupt("return");case 43:this.lineHighlighter.clear();this.lineHighlighter.highlight(16);_context.next=47;return this.timer.wait(500);case 47:proceed=_context.sent;if(proceed){_context.next=50;break}return _context.abrupt("return");case 50:this.lineHighlighter.clear();this.visualGraph.addVertex("C",50,100);this.lineHighlighter.highlight(6);_context.next=55;return this.timer.wait(500);
case 55:proceed=_context.sent;if(proceed){_context.next=58;break}return _context.abrupt("return");case 58:this.lineHighlighter.clear();this.lineHighlighter.highlight(16);_context.next=62;return this.timer.wait(500);case 62:proceed=_context.sent;if(proceed){_context.next=65;break}return _context.abrupt("return");case 65:this.lineHighlighter.clear();this.lineHighlighter.highlight(17);_context.next=69;return this.timer.wait(500);case 69:proceed=_context.sent;if(proceed){_context.next=72;break}return _context.abrupt("return");
case 72:this.lineHighlighter.clear();this.visualGraph.addVertex("D",215,150);this.lineHighlighter.highlight(6);_context.next=77;return this.timer.wait(500);case 77:proceed=_context.sent;if(proceed){_context.next=80;break}return _context.abrupt("return");case 80:this.lineHighlighter.clear();this.lineHighlighter.highlight(17);_context.next=84;return this.timer.wait(500);case 84:proceed=_context.sent;if(proceed){_context.next=87;break}return _context.abrupt("return");case 87:this.lineHighlighter.clear();
this.lineHighlighter.highlight(18);_context.next=91;return this.timer.wait(500);case 91:proceed=_context.sent;if(proceed){_context.next=94;break}return _context.abrupt("return");case 94:this.lineHighlighter.clear();this.visualGraph.addVertex("E",380,50);this.lineHighlighter.highlight(6);_context.next=99;return this.timer.wait(500);case 99:proceed=_context.sent;if(proceed){_context.next=102;break}return _context.abrupt("return");case 102:this.lineHighlighter.clear();this.lineHighlighter.highlight(18);
_context.next=106;return this.timer.wait(500);case 106:proceed=_context.sent;if(proceed){_context.next=109;break}return _context.abrupt("return");case 109:this.lineHighlighter.clear();this.lineHighlighter.highlight(19);_context.next=113;return this.timer.wait(500);case 113:proceed=_context.sent;if(proceed){_context.next=116;break}return _context.abrupt("return");case 116:this.lineHighlighter.clear();this.visualGraph.addVertex("F",380,100);this.lineHighlighter.highlight(6);_context.next=121;return this.timer.wait(500);
case 121:proceed=_context.sent;if(proceed){_context.next=124;break}return _context.abrupt("return");case 124:this.lineHighlighter.clear();this.lineHighlighter.highlight(19);_context.next=128;return this.timer.wait(500);case 128:proceed=_context.sent;if(proceed){_context.next=131;break}return _context.abrupt("return");case 131:this.lineHighlighter.clear();this.finish();case 133:case "end":return _context.stop()}},_callee,this)}));function code(){return _code.apply(this,arguments)}return code}()},{exampleId:2,
lineHighlighter:new LineHighlighter("code-2"),visualGraph:new VisualGraph("graph-2",["v1","v2"]),timer:new Timer,code:function(){var _code2=_asyncToGenerator(regeneratorRuntime.mark(function _callee3(){var proceed,graph;return regeneratorRuntime.wrap(function _callee3$(_context3){while(1)switch(_context3.prev=_context3.next){case 0:graph=new Graph;graph.exampleAddEdge=function(){var _ref=_asyncToGenerator(regeneratorRuntime.mark(function _callee2(v1,v2,lineHighlighter,timer,visualGraph){return regeneratorRuntime.wrap(function _callee2$(_context2){while(1)switch(_context2.prev=
_context2.next){case 0:visualGraph.setPointerToVertex("v1",v1);if(v1==="B"||v1==="D"||v1==="E")visualGraph.setPointerUp("v1");visualGraph.setPointerToVertex("v2",v2);if(v2==="B"||v2==="D"||v2==="E")visualGraph.setPointerUp("v2");lineHighlighter.highlight(6);_context2.next=7;return timer.wait(500);case 7:proceed=_context2.sent;if(proceed){_context2.next=10;break}return _context2.abrupt("return");case 10:lineHighlighter.clear();if(!(!this.adjacencyList[v1]||!this.adjacencyList[v2])){_context2.next=
13;break}return _context2.abrupt("return");case 13:if(!this.adjacencyList[v1].includes(v2))this.adjacencyList[v1].push(v2);if(!this.adjacencyList[v2].includes(v1))this.adjacencyList[v2].push(v1);visualGraph.addEdge(v1,v2,null,true);lineHighlighter.highlight(9);_context2.next=19;return timer.wait(500);case 19:proceed=_context2.sent;if(proceed){_context2.next=22;break}return _context2.abrupt("return");case 22:lineHighlighter.clear();visualGraph.setEdgeAsUndirected(v1,v2);lineHighlighter.highlight(10);
_context2.next=27;return timer.wait(500);case 27:proceed=_context2.sent;if(proceed){_context2.next=30;break}return _context2.abrupt("return");case 30:lineHighlighter.clear();visualGraph.hidePointer("v1");visualGraph.setPointerDown("v1");visualGraph.hidePointer("v2");visualGraph.setPointerDown("v2");case 35:case "end":return _context2.stop()}},_callee2,this)}));return function(_x,_x2,_x3,_x4,_x5){return _ref.apply(this,arguments)}}();this.lineHighlighter.highlight(15);_context3.next=5;return this.timer.wait(500);
case 5:proceed=_context3.sent;if(proceed){_context3.next=8;break}return _context3.abrupt("return");case 8:this.lineHighlighter.clear();graph.addVertex("A");graph.addVertex("B");graph.addVertex("C");this.visualGraph.addVertex("A",215,0);this.visualGraph.addVertex("B",50,50);this.visualGraph.addVertex("C",50,100);this.lineHighlighter.highlight(18);_context3.next=18;return this.timer.wait(500);case 18:proceed=_context3.sent;if(proceed){_context3.next=21;break}return _context3.abrupt("return");case 21:this.lineHighlighter.clear();
graph.addVertex("D");graph.addVertex("E");graph.addVertex("F");this.visualGraph.addVertex("D",215,150);this.visualGraph.addVertex("E",380,50);this.visualGraph.addVertex("F",380,100);this.lineHighlighter.highlight(19);_context3.next=31;return this.timer.wait(500);case 31:proceed=_context3.sent;if(proceed){_context3.next=34;break}return _context3.abrupt("return");case 34:this.lineHighlighter.clear();this.lineHighlighter.highlight(22);_context3.next=38;return this.timer.wait(500);case 38:proceed=_context3.sent;
if(proceed){_context3.next=41;break}return _context3.abrupt("return");case 41:this.lineHighlighter.clear();_context3.next=44;return graph.exampleAddEdge("A","B",this.lineHighlighter,this.timer,this.visualGraph);case 44:if(proceed){_context3.next=46;break}return _context3.abrupt("return");case 46:this.lineHighlighter.highlight(22);_context3.next=49;return this.timer.wait(500);case 49:proceed=_context3.sent;if(proceed){_context3.next=52;break}return _context3.abrupt("return");case 52:this.lineHighlighter.clear();
this.lineHighlighter.highlight(23);_context3.next=56;return this.timer.wait(500);case 56:proceed=_context3.sent;if(proceed){_context3.next=59;break}return _context3.abrupt("return");case 59:this.lineHighlighter.clear();_context3.next=62;return graph.exampleAddEdge("B","C",this.lineHighlighter,this.timer,this.visualGraph);case 62:if(proceed){_context3.next=64;break}return _context3.abrupt("return");case 64:this.lineHighlighter.highlight(23);_context3.next=67;return this.timer.wait(500);case 67:proceed=
_context3.sent;if(proceed){_context3.next=70;break}return _context3.abrupt("return");case 70:this.lineHighlighter.clear();this.lineHighlighter.highlight(24);_context3.next=74;return this.timer.wait(500);case 74:proceed=_context3.sent;if(proceed){_context3.next=77;break}return _context3.abrupt("return");case 77:this.lineHighlighter.clear();_context3.next=80;return graph.exampleAddEdge("C","D",this.lineHighlighter,this.timer,this.visualGraph);case 80:if(proceed){_context3.next=82;break}return _context3.abrupt("return");
case 82:this.lineHighlighter.highlight(24);_context3.next=85;return this.timer.wait(500);case 85:proceed=_context3.sent;if(proceed){_context3.next=88;break}return _context3.abrupt("return");case 88:this.lineHighlighter.clear();this.lineHighlighter.highlight(25);_context3.next=92;return this.timer.wait(500);case 92:proceed=_context3.sent;if(proceed){_context3.next=95;break}return _context3.abrupt("return");case 95:this.lineHighlighter.clear();_context3.next=98;return graph.exampleAddEdge("D","F",this.lineHighlighter,
this.timer,this.visualGraph);case 98:if(proceed){_context3.next=100;break}return _context3.abrupt("return");case 100:this.lineHighlighter.highlight(25);_context3.next=103;return this.timer.wait(500);case 103:proceed=_context3.sent;if(proceed){_context3.next=106;break}return _context3.abrupt("return");case 106:this.lineHighlighter.clear();this.lineHighlighter.highlight(26);_context3.next=110;return this.timer.wait(500);case 110:proceed=_context3.sent;if(proceed){_context3.next=113;break}return _context3.abrupt("return");
case 113:this.lineHighlighter.clear();_context3.next=116;return graph.exampleAddEdge("D","E",this.lineHighlighter,this.timer,this.visualGraph);case 116:if(proceed){_context3.next=118;break}return _context3.abrupt("return");case 118:this.lineHighlighter.highlight(26);_context3.next=121;return this.timer.wait(500);case 121:proceed=_context3.sent;if(proceed){_context3.next=124;break}return _context3.abrupt("return");case 124:this.lineHighlighter.clear();this.lineHighlighter.highlight(27);_context3.next=
128;return this.timer.wait(500);case 128:proceed=_context3.sent;if(proceed){_context3.next=131;break}return _context3.abrupt("return");case 131:this.lineHighlighter.clear();_context3.next=134;return graph.exampleAddEdge("F","E",this.lineHighlighter,this.timer,this.visualGraph);case 134:if(proceed){_context3.next=136;break}return _context3.abrupt("return");case 136:this.lineHighlighter.highlight(27);_context3.next=139;return this.timer.wait(500);case 139:proceed=_context3.sent;if(proceed){_context3.next=
142;break}return _context3.abrupt("return");case 142:this.lineHighlighter.clear();this.lineHighlighter.highlight(28);_context3.next=146;return this.timer.wait(500);case 146:proceed=_context3.sent;if(proceed){_context3.next=149;break}return _context3.abrupt("return");case 149:this.lineHighlighter.clear();_context3.next=152;return graph.exampleAddEdge("E","A",this.lineHighlighter,this.timer,this.visualGraph);case 152:if(proceed){_context3.next=154;break}return _context3.abrupt("return");case 154:this.lineHighlighter.highlight(28);
_context3.next=157;return this.timer.wait(500);case 157:proceed=_context3.sent;if(proceed){_context3.next=160;break}return _context3.abrupt("return");case 160:this.lineHighlighter.clear();this.lineHighlighter.highlight(29);_context3.next=164;return this.timer.wait(500);case 164:proceed=_context3.sent;if(proceed){_context3.next=167;break}return _context3.abrupt("return");case 167:this.lineHighlighter.clear();_context3.next=170;return graph.exampleAddEdge("B","D",this.lineHighlighter,this.timer,this.visualGraph);
case 170:if(proceed){_context3.next=172;break}return _context3.abrupt("return");case 172:this.lineHighlighter.highlight(29);_context3.next=175;return this.timer.wait(500);case 175:proceed=_context3.sent;if(proceed){_context3.next=178;break}return _context3.abrupt("return");case 178:this.lineHighlighter.clear();this.finish();case 180:case "end":return _context3.stop()}},_callee3,this)}));function code(){return _code2.apply(this,arguments)}return code}()},{exampleId:3,lineHighlighter:new LineHighlighter("code-3"),
visualGraph:new VisualGraph("graph-3",["v1","v2"]),timer:new Timer,code:function(){var _code3=_asyncToGenerator(regeneratorRuntime.mark(function _callee5(){var proceed,graph;return regeneratorRuntime.wrap(function _callee5$(_context5){while(1)switch(_context5.prev=_context5.next){case 0:graph=new Graph;graph.exampleRemoveEdge=function(){var _ref2=_asyncToGenerator(regeneratorRuntime.mark(function _callee4(v1,v2,lineHighlighter,timer,visualGraph){var index;return regeneratorRuntime.wrap(function _callee4$(_context4){while(1)switch(_context4.prev=
_context4.next){case 0:visualGraph.setPointerToVertex("v1",v1);if(v1==="B"||v1==="D")visualGraph.setPointerUp("v1");visualGraph.setPointerToVertex("v2",v2);if(v2==="B"||v2==="D")visualGraph.setPointerUp("v2");lineHighlighter.highlight(6);_context4.next=7;return timer.wait(500);case 7:proceed=_context4.sent;if(proceed){_context4.next=10;break}return _context4.abrupt("return");case 10:lineHighlighter.clear();if(!(!this.adjacencyList[v1]||!this.adjacencyList[v2])){_context4.next=13;break}return _context4.abrupt("return");
case 13:index=this.adjacencyList[v1].findIndex(function(val){return val===v2});lineHighlighter.highlight(9);_context4.next=17;return timer.wait(500);case 17:proceed=_context4.sent;if(proceed){_context4.next=20;break}return _context4.abrupt("return");case 20:lineHighlighter.clear();this.adjacencyList[v1].splice(index,1);visualGraph.setEdgeAsDirected(v1,v2);visualGraph.invertEdge(v1,v2);lineHighlighter.highlight(11);_context4.next=27;return timer.wait(500);case 27:proceed=_context4.sent;if(proceed){_context4.next=
30;break}return _context4.abrupt("return");case 30:lineHighlighter.clear();index=this.adjacencyList[v2].findIndex(function(val){return val===v1});lineHighlighter.highlight(14);_context4.next=35;return timer.wait(500);case 35:proceed=_context4.sent;if(proceed){_context4.next=38;break}return _context4.abrupt("return");case 38:lineHighlighter.clear();this.adjacencyList[v2].splice(index,1);visualGraph.removeEdge(v1,v2);lineHighlighter.highlight(16);_context4.next=44;return timer.wait(500);case 44:proceed=
_context4.sent;if(proceed){_context4.next=47;break}return _context4.abrupt("return");case 47:lineHighlighter.clear();visualGraph.hidePointer("v1");visualGraph.setPointerDown("v1");visualGraph.hidePointer("v2");visualGraph.setPointerDown("v2");case 52:case "end":return _context4.stop()}},_callee4,this)}));return function(_x6,_x7,_x8,_x9,_x10){return _ref2.apply(this,arguments)}}();this.lineHighlighter.highlight(21);_context5.next=5;return this.timer.wait(500);case 5:proceed=_context5.sent;if(proceed){_context5.next=
8;break}return _context5.abrupt("return");case 8:this.lineHighlighter.clear();graph.addVertex("A");graph.addVertex("B");graph.addVertex("C");this.visualGraph.addVertex("A",215,0);this.visualGraph.addVertex("B",50,50);this.visualGraph.addVertex("C",50,100);this.lineHighlighter.highlight(22);_context5.next=18;return this.timer.wait(500);case 18:proceed=_context5.sent;if(proceed){_context5.next=21;break}return _context5.abrupt("return");case 21:this.lineHighlighter.clear();graph.addVertex("D");graph.addVertex("E");
graph.addVertex("F");this.visualGraph.addVertex("D",215,150);this.visualGraph.addVertex("E",380,50);this.visualGraph.addVertex("F",380,100);this.lineHighlighter.highlight(23);_context5.next=31;return this.timer.wait(500);case 31:proceed=_context5.sent;if(proceed){_context5.next=34;break}return _context5.abrupt("return");case 34:this.lineHighlighter.clear();graph.addEdge("A","B");graph.addEdge("B","C");graph.addEdge("C","D");graph.addEdge("D","F");this.visualGraph.addEdge("A","B");this.visualGraph.addEdge("B",
"C");this.visualGraph.addEdge("C","D");this.visualGraph.addEdge("D","F");this.lineHighlighter.highlight(24);_context5.next=46;return this.timer.wait(500);case 46:proceed=_context5.sent;if(proceed){_context5.next=49;break}return _context5.abrupt("return");case 49:this.lineHighlighter.clear();graph.addEdge("D","E");graph.addEdge("F","E");graph.addEdge("E","A");graph.addEdge("B","D");this.visualGraph.addEdge("D","E");this.visualGraph.addEdge("F","E");this.visualGraph.addEdge("E","A");this.visualGraph.addEdge("B",
"D");this.lineHighlighter.highlight(25);_context5.next=61;return this.timer.wait(500);case 61:proceed=_context5.sent;if(proceed){_context5.next=64;break}return _context5.abrupt("return");case 64:this.lineHighlighter.clear();this.lineHighlighter.highlight(28);_context5.next=68;return this.timer.wait(500);case 68:proceed=_context5.sent;if(proceed){_context5.next=71;break}return _context5.abrupt("return");case 71:this.lineHighlighter.clear();_context5.next=74;return graph.exampleRemoveEdge("A","B",this.lineHighlighter,
this.timer,this.visualGraph);case 74:if(proceed){_context5.next=76;break}return _context5.abrupt("return");case 76:this.lineHighlighter.highlight(28);_context5.next=79;return this.timer.wait(500);case 79:proceed=_context5.sent;if(proceed){_context5.next=82;break}return _context5.abrupt("return");case 82:this.lineHighlighter.clear();this.lineHighlighter.highlight(29);_context5.next=86;return this.timer.wait(500);case 86:proceed=_context5.sent;if(proceed){_context5.next=89;break}return _context5.abrupt("return");
case 89:this.lineHighlighter.clear();_context5.next=92;return graph.exampleRemoveEdge("B","D",this.lineHighlighter,this.timer,this.visualGraph);case 92:if(proceed){_context5.next=94;break}return _context5.abrupt("return");case 94:this.lineHighlighter.highlight(29);_context5.next=97;return this.timer.wait(500);case 97:proceed=_context5.sent;if(proceed){_context5.next=100;break}return _context5.abrupt("return");case 100:this.lineHighlighter.clear();this.lineHighlighter.highlight(30);_context5.next=
104;return this.timer.wait(500);case 104:proceed=_context5.sent;if(proceed){_context5.next=107;break}return _context5.abrupt("return");case 107:this.lineHighlighter.clear();_context5.next=110;return graph.exampleRemoveEdge("D","F",this.lineHighlighter,this.timer,this.visualGraph);case 110:if(proceed){_context5.next=112;break}return _context5.abrupt("return");case 112:this.lineHighlighter.highlight(30);_context5.next=115;return this.timer.wait(500);case 115:proceed=_context5.sent;if(proceed){_context5.next=
118;break}return _context5.abrupt("return");case 118:this.lineHighlighter.clear();this.finish();case 120:case "end":return _context5.stop()}},_callee5,this)}));function code(){return _code3.apply(this,arguments)}return code}()},{exampleId:4,lineHighlighter:new LineHighlighter("code-4"),visualGraph:new VisualGraph("graph-4",["adjacentVertex","vertex"]),timer:new Timer,code:function(){var _code4=_asyncToGenerator(regeneratorRuntime.mark(function _callee7(){var proceed,graph;return regeneratorRuntime.wrap(function _callee7$(_context7){while(1)switch(_context7.prev=
_context7.next){case 0:graph=new Graph;graph.exampleRemoveVertex=function(){var _ref3=_asyncToGenerator(regeneratorRuntime.mark(function _callee6(vertex,lineHighlighter,timer,visualGraph){var adjacentVertex;return regeneratorRuntime.wrap(function _callee6$(_context6){while(1)switch(_context6.prev=_context6.next){case 0:visualGraph.setPointerToVertex("vertex",vertex);if(vertex==="B")visualGraph.setPointerUp("vertex");lineHighlighter.highlight(6);_context6.next=5;return timer.wait(500);case 5:proceed=
_context6.sent;if(proceed){_context6.next=8;break}return _context6.abrupt("return");case 8:lineHighlighter.clear();case 9:if(!this.adjacencyList[vertex].length){_context6.next=39;break}adjacentVertex=this.adjacencyList[vertex].pop();visualGraph.setPointerToVertex("adjacentVertex",adjacentVertex);if(adjacentVertex==="A"||adjacentVertex==="C")visualGraph.setPointerDown("adjacentVertex");else visualGraph.setPointerUp("adjacentVertex");lineHighlighter.highlight(8);_context6.next=16;return timer.wait(500);
case 16:proceed=_context6.sent;if(proceed){_context6.next=19;break}return _context6.abrupt("return");case 19:lineHighlighter.clear();this.removeEdge(vertex,adjacentVertex);visualGraph.removeEdge(vertex,adjacentVertex);lineHighlighter.highlight(10);_context6.next=25;return timer.wait(500);case 25:proceed=_context6.sent;if(proceed){_context6.next=28;break}return _context6.abrupt("return");case 28:lineHighlighter.clear();visualGraph.hidePointer("adjacentVertex");lineHighlighter.highlight(6);_context6.next=
33;return timer.wait(500);case 33:proceed=_context6.sent;if(proceed){_context6.next=36;break}return _context6.abrupt("return");case 36:lineHighlighter.clear();_context6.next=9;break;case 39:delete this.adjacencyList[vertex];visualGraph.removeVertex(vertex);lineHighlighter.highlight(13);_context6.next=44;return timer.wait(500);case 44:proceed=_context6.sent;if(proceed){_context6.next=47;break}return _context6.abrupt("return");case 47:lineHighlighter.clear();visualGraph.hidePointer("vertex");case 49:case "end":return _context6.stop()}},
_callee6,this)}));return function(_x11,_x12,_x13,_x14){return _ref3.apply(this,arguments)}}();this.lineHighlighter.highlight(18);_context7.next=5;return this.timer.wait(500);case 5:proceed=_context7.sent;if(proceed){_context7.next=8;break}return _context7.abrupt("return");case 8:this.lineHighlighter.clear();graph.addVertex("A");graph.addVertex("B");graph.addVertex("C");this.visualGraph.addVertex("A",215,0);this.visualGraph.addVertex("B",50,50);this.visualGraph.addVertex("C",50,100);this.lineHighlighter.highlight(19);
_context7.next=18;return this.timer.wait(500);case 18:proceed=_context7.sent;if(proceed){_context7.next=21;break}return _context7.abrupt("return");case 21:this.lineHighlighter.clear();graph.addVertex("D");graph.addVertex("E");graph.addVertex("F");this.visualGraph.addVertex("D",215,150);this.visualGraph.addVertex("E",380,50);this.visualGraph.addVertex("F",380,100);this.lineHighlighter.highlight(20);_context7.next=31;return this.timer.wait(500);case 31:proceed=_context7.sent;if(proceed){_context7.next=
34;break}return _context7.abrupt("return");case 34:this.lineHighlighter.clear();graph.addEdge("A","B");graph.addEdge("B","C");graph.addEdge("C","D");graph.addEdge("D","F");this.visualGraph.addEdge("A","B");this.visualGraph.addEdge("B","C");this.visualGraph.addEdge("C","D");this.visualGraph.addEdge("D","F");this.lineHighlighter.highlight(21);_context7.next=46;return this.timer.wait(500);case 46:proceed=_context7.sent;if(proceed){_context7.next=49;break}return _context7.abrupt("return");case 49:this.lineHighlighter.clear();
graph.addEdge("D","E");graph.addEdge("F","E");graph.addEdge("E","A");graph.addEdge("B","D");this.visualGraph.addEdge("D","E");this.visualGraph.addEdge("F","E");this.visualGraph.addEdge("E","A");this.visualGraph.addEdge("B","D");this.lineHighlighter.highlight(22);_context7.next=61;return this.timer.wait(500);case 61:proceed=_context7.sent;if(proceed){_context7.next=64;break}return _context7.abrupt("return");case 64:this.lineHighlighter.clear();this.lineHighlighter.highlight(25);_context7.next=68;return this.timer.wait(500);
case 68:proceed=_context7.sent;if(proceed){_context7.next=71;break}return _context7.abrupt("return");case 71:this.lineHighlighter.clear();_context7.next=74;return graph.exampleRemoveVertex("F",this.lineHighlighter,this.timer,this.visualGraph);case 74:if(proceed){_context7.next=76;break}return _context7.abrupt("return");case 76:this.lineHighlighter.highlight(25);_context7.next=79;return this.timer.wait(500);case 79:proceed=_context7.sent;if(proceed){_context7.next=82;break}return _context7.abrupt("return");
case 82:this.lineHighlighter.clear();this.lineHighlighter.highlight(26);_context7.next=86;return this.timer.wait(500);case 86:proceed=_context7.sent;if(proceed){_context7.next=89;break}return _context7.abrupt("return");case 89:this.lineHighlighter.clear();_context7.next=92;return graph.exampleRemoveVertex("B",this.lineHighlighter,this.timer,this.visualGraph);case 92:if(proceed){_context7.next=94;break}return _context7.abrupt("return");case 94:this.lineHighlighter.highlight(26);_context7.next=97;return this.timer.wait(500);
case 97:proceed=_context7.sent;if(proceed){_context7.next=100;break}return _context7.abrupt("return");case 100:this.lineHighlighter.clear();this.finish();case 102:case "end":return _context7.stop()}},_callee7,this)}));function code(){return _code4.apply(this,arguments)}return code}()}];initExamples(config);