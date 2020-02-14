(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['exports', 'echarts'], factory);
	} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
		// CommonJS
		factory(exports, require('echarts'));
	} else {
		// Browser globals
		factory({}, root.echarts);
	}
}(this, function(exports, echarts) {
	var log = function(msg) {
		if (typeof console !== 'undefined') {
			console && console.error && console.error(msg);
		}
	};
	if (!echarts) {
		log('ECharts is not Loaded');
		return;
	}
	var contrastColor = '#fff';
	var axisCommon = function() {
		return {
			nameTextStyle: {
				color: contrastColor,
				fontSize: 20
			},
			axisLine: {
				lineStyle: {
					color: contrastColor
				}
			},
			axisTick: {
				lineStyle: {
					color: contrastColor
				}
			},
			axisLabel: {
				textStyle: {
					color: contrastColor,
					fontSize: 18
				}
			},
			splitLine: {
				show: false
			},
			splitArea: {
				areaStyle: {
					color: contrastColor
				}
			}
		};
	};

	var colorPalette = ['#ED7D31', '#8FEA15', '#5B9BD5', '#FFC000', '#FFAEC9', '#FF3C3C', '#AC51FF', '#47EDDC', '#800000', '#0E652F', '#A5A5A5'];
	var theme = {
		color: colorPalette,
		//backgroundColor: '#333',
		tooltip: {
			axisPointer: {
				lineStyle: {
					color: contrastColor
				},
				crossStyle: {
					color: contrastColor
				}
			},
			textStyle: {
				fontSize: 20
			}
		},
		legend: {
			textStyle: {
				color: contrastColor,
				fontSize: 20
			},
			top:'3%'
		},
		textStyle: {
			color: contrastColor
		},
		title: {
			bottom: 'bottom',
			left: 'center',
			textStyle: {
				color: contrastColor,
				fontSize: 30
			}
		},
		toolbox: {
			iconStyle: {
				normal: {
					borderColor: contrastColor
				}
			}
		},
		dataZoom: {
			textStyle: {
				color: contrastColor
			}
		},
		visualMap: {
			textStyle: {
				color: contrastColor
			}
		},
		timeline: {
			lineStyle: {
				color: contrastColor
			},
			itemStyle: {
				normal: {
					color: colorPalette[1]
				}
			},
			label: {
				normal: {
					textStyle: {
						color: contrastColor
					}
				}
			},
			controlStyle: {
				normal: {
					color: contrastColor,
					borderColor: contrastColor
				}
			}
		},
		timeAxis: axisCommon(),
		logAxis: axisCommon(),
		valueAxis: axisCommon(),
		categoryAxis: axisCommon(),

		line: {
			symbol: 'circle'
		},
		graph: {
			color: colorPalette
		},
		gauge: {
			title: {
				textStyle: {
					color: contrastColor
				}
			}
		},
		candlestick: {
			itemStyle: {
				normal: {
					color: '#FD1050',
					color0: '#0CF49B',
					borderColor: '#FD1050',
					borderColor0: '#0CF49B'
				}
			}
		}
	};
	theme.categoryAxis.splitLine.show = false;
	echarts.registerTheme('dark', theme);
}));