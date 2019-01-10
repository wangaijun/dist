(function() {
	if (window.cloudtplus) {
		return;
	}

	var u = navigator.userAgent;
	var tag = document.getElementById("cloudtplus-script-tag");
	var platform = u.match(/Android/i) ? "android" : u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i) ? "ios" : "";

	if (tag && platform) {
		var onDeviceReady = function() {
			window.cloudtplus.isDeviceReady = true;
			if (window.cloudtplus.__DeviceReady) {
				window.cloudtplus.onDeviceReady(window.cloudtplus.__DeviceReady);
				delete window.cloudtplus.__DeviceReady;
			}
		};
		document.addEventListener("deviceready", onDeviceReady, false);
		document.write("<script type='text/javascript' src='" + tag.src.replace("cloudtplus.js", "cordova/" + platform + "/cordova.js") + "'><\/script>");
	}

	window.cloudtplus = {
		/**
		 * @property {String} version
		 * 版本号
		 */
		version: "1.7.4",

		/**
		 * @property {String} platform
		 * 平台名称，"android" 或 "ios" 或 ""
		 */
		platform: platform,

		/**
		 * @property {Boolean} isDeviceReady
		 * 设备是否准备就绪，只有准备就绪后，才可以执行与设备进行交互的相关方法
		 */
		isDeviceReady: false,

		/**
		 * @event onDeviceReady
		 * 当设备准备好后触发，如果设备已经准备好则直接执行
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.onDeviceReady(function() {
		 * 			// 从这里开始执行window.cloudtplus中的方法
		 * 		});
		 * 
		 * @param {Function} fn 回调函数
		 * @return {Object} 返回cloudtplus对象
		 */
		onDeviceReady: function(fn) {
			if (window.cloudtplus.isDeviceReady) {
				if (typeof fn == "function") {
					fn.apply(window);
				}
			} else {
				window.cloudtplus.__DeviceReady = fn || null;
			}
			return window.cloudtplus;
		},

		/**
		 * @event onDeviceNotification
		 * 接收设备通知
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.onDeviceNotification(function(type, data) {
		 * 			// type 为通知类型，包括：
		 * 			// 		"_DN_NOTIFICATION_REMOTE"		收到远程通知
		 * 			// 		"_DN_PAGE_BACKGROUND"			已经进入后台
		 * 			// 		"_DN_PAGE_FOREGROUND"			将要进入前台
		 * 			// 		"_DN_APP_ONLINE"				进入在线状态
		 * 			// 		"_DN_APP_OFFLINE"				进入离线状态
		 * 			// 		"_DN_AUTOUPLOAD_SUCCESS"		自动上传成功
		 * 			// data 为通知内容
		 * 		});
		 * 
		 * @param {Function} fn 回调函数
		 * @return {Object} 返回cloudtplus对象
		 */
		onDeviceNotification: function(fn) {
			window.Application.onDeviceNotification(fn);
			return window.cloudtplus;
		},

		/**
		 * @method updateTitlebar
		 * 更新标题栏
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.updateTitlebar({
		 * 			success: function() {},
		 * 			error: function() {},
		 * 			text: "",
		 * 			color: "",
		 * 			backgroundColor: ""
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		updateTitlebar: function(args) {
			args = args || {};
			window.Application.updateTitlebar(args.success, args.error, {
				backgroundColor: args.backgroundColor,
				leftButtonColor: args.color,
				textColor: args.color,
				text: args.text
			});
			return window.cloudtplus;
		},

		/**
		 * @method showScanButton
		 * 显示扫码按钮
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.showScanButton({
		 * 			success: function(data) {
		 * 				// data为扫码内容，字符串
		 * 			},
		 * 			error: function() {}
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		showScanButton: function(args) {
			args = args || {};
			window.Application.showScanButton(args.success, args.error);
			return window.cloudtplus;
		},
		
		/**
		 * @method hideScanButton
		 * 隐藏扫码按钮
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.hideScanButton({
		 * 			success: function() {},
		 * 			error: function() {}
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		hideScanButton: function(args) {
			args = args || {};
			window.Application.hideScanButton(args.success, args.error);
			return window.cloudtplus;
		},

		/**
		 * @method showNetworkActivityIndicator
		 * 显示状态栏菊花 (仅支持iOS)
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.showNetworkActivityIndicator({
		 * 			success: function() {},
		 * 			error: function() {}
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		showNetworkActivityIndicator: function(args) {
			args = args || {};
			window.Application.showNetworkActivityIndicator(args.success, args.error);
			return window.cloudtplus;
		},

		/**
		 * @method hideNetworkActivityIndicator
		 * 隐藏状态栏菊花 (仅支持iOS)
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.hideNetworkActivityIndicator({
		 * 			success: function() {},
		 * 			error: function() {}
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		hideNetworkActivityIndicator: function(args) {
			args = args || {};
			window.Application.hideNetworkActivityIndicator(args.success, args.error);
			return window.cloudtplus;
		},

       /**
         * @method showLeftSideMenu
         * 显示左边栏菜单（等同于从壳的标题栏上点击【菜单】按钮）
         *
         * Example:
         *
         * 		window.cloudtplus.showLeftSideMenu({
         * 			success: function() {},
         * 			error: function() {}
         * 		});
         *
         * @param {Object} args 参数对象
         * @return {Object} 返回cloudtplus对象
         */
        showLeftSideMenu: function(args) {
            args = args || {};
            window.Application.showLeftSideMenu(args.success, args.error);
            return window.cloudtplus;
        },

        /**
         * @method showNotifyView
         * 显示推送消息视图（等同于从壳的标题栏上点击【消息】按钮）
         *
         * Example:
         *
         * 		window.cloudtplus.showNotifyView({
         * 			success: function() {},
         * 			error: function() {}
         * 		});
         *
         * @param {Object} args 参数对象
         * @return {Object} 返回cloudtplus对象
         */
        showNotifyView: function(args) {
            args = args || {};
            window.Application.showNotifyView(args.success, args.error);
            return window.cloudtplus;
        },

		/**
         * @method markOnBlueprint
         * 质量安全问题，在图纸中添加（或修改）质量安全标记
         * Example:
         *         window.cloudtplus.markOnBlueprint({
         *             success: function() {},
         *             error: function() {},
         *             category: "",           // 质量/安全分类: quality/security，用于确定标记的形状
         *             mode: "",               // 模式：new-新建标记，view-查看标记，move-移动标记
         *             blueprint: {            // 图纸
         *                id: "",              //  --图纸ID
         *                name: "",            //  --图纸名
         *                blueprint_download_url: "",     //  --下载地址
         *             },
         *             marker: {               // 需要查看或修改的标记，如果mode为new，则该参数应该为null
         *                positionX: "",       //  --相对的X坐标，浮点数，取值范围[0～1]
         *                positionY: "",       //  --相对的Y坐标，浮点数，取值范围[0～1]
         *                status: "",          //  --质量安全问题状态，用于确定标记的线条样式或颜色
         *             }
         *         });
         *
         * @param {Object} args 参数对象
         * @return {Object} 返回cloudtplus对象
         */
        markOnBlueprint: function(args) {
            args = args || {};
            window.Application.markOnBlueprint(args.success, args.error, {
                category: args.category,
                mode: args.mode,
                blueprint: args.blueprint,
                marker: args.marker
            });
            return window.cloudtplus;
        },

        markOnBlueprint2: function(args) {
            args = args || {};
            window.Application.markOnBlueprint2(args.success, args.error, {
                category: args.category,
                mode: args.mode,
                blueprint: args.blueprint,
                markers: args.markers
            });
            return window.cloudtplus;
        },
        /**
         * @method startMonitorBeacon
         * 开始蓝牙扫描
         * Example:
         *         window.cloudtplus.startMonitorBeacon({
         *             success: function(str) {
         *                 // 开启成功的回调，如果没有权限也会开启成功，但随后会在error回调中返回错误
         *             },
         *             error: function(str) {
         *                 // 失败回调，包括开启失败、没有蓝牙定位的权限、调用者主动调用stopMonitorBeacon结束扫描三种情况
         *             },
         *             result: function(array) {
         *                 // 扫描结果
         *             },
         *             radius: number     // 扫描半径
         *         });
         *
         * @param {Object} args 参数对象
         * @return {Object} 返回cloudtplus对象
         */
        startMonitorBeacon: function(args) {
            args = args || {};
            window.Application.startMonitorBeacon(args.success, args.error, args.result, {radius: args.radius});
            return window.cloudtplus;
        },

        /**
         * @method stopMonitorBeacon
         * 结束蓝牙扫描
         * Example:
         *         window.cloudtplus.stopMonitorBeacon({
         *             success: function(str) {
         *                 // 结束成功的回调
         *             },
         *             error: function(str) {
         *                 // 失败回调
         *             }
         *         });
         *
         * @param {Object} args 参数对象
         * @return {Object} 返回cloudtplus对象
         */
        stopMonitorBeacon: function(args) {
            args = args || {};
            window.Application.stopMonitorBeacon(args.success, args.error);
            return window.cloudtplus;
        },

		/**
		 * @method showHikvision
		 * 打开海康监控
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.showHikvision({
		 * 			success: function() {},
		 * 			error: function() {},
		 * 			deviceName: "",		// 设备名称
		 * 			deviceIP: "",		// 设备地址
		 * 			devicePort: "",		// 设备端口
		 * 			userName: "",		// 帐号
		 * 			password: "",		// 密码
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		showHikvision: function(args) {
			args = args || {};
			window.Application.showHikvision(args.success, args.error, {
				deviceName: args.deviceName,
				deviceIP: args.deviceIP,
				devicePort: args.devicePort,
				userName: args.userName,
				password: args.password
			});
			return window.cloudtplus;
		},

		/**
		 * @method showHikvision8700
		 * 打开海康监控
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.showHikvision8700({
		 * 			success: function() {},
		 * 			error: function() {},
		 * 			deviceIP: "",		// 设备地址
		 * 			devicePort: "",		// 设备端口
		 * 			userName: "",		// 帐号
		 * 			password: "",		// 密码
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		showHikvision8700: function(args) {
			args = args || {};
			window.Application.showHikvision8700(args.success, args.error, {
				deviceIP: args.deviceIP,
				devicePort: args.devicePort,
				userName: args.userName,
				password: args.password
			});
			return window.cloudtplus;
		},


		/**
         * @method showDHVideo
         * 打开大华视频监控
         *
         * Example:
         *
         * 		window.cloudtplus.showDHVideo({
         * 			success: function() {},
         * 			error: function() {},
         * 			deviceIP: "",		// 设备地址
         * 			devicePort: "",		// 设备端口
         * 			userName: "",		// 帐号
         * 			password: "",		// 密码
         * 		});
         *
         * @param {Object} args 参数对象
         * @return {Object} 返回cloudtplus对象
         */
        showDHVideo: function(args) {
            args = args || {};
            window.Application.showDHVideo(args.success, args.error, {
                deviceIP: args.deviceIP,
                devicePort: args.devicePort,
                userName: args.userName,
                password: args.password
            });
            return window.cloudtplus;
        },


       /**
         * @method scanFace
         * 打开相机，自动检测人脸，并自动拍照剪裁，返回人脸图片
         *
         * Example:
         *
         *      window.cloudtplus.scanFace({
         *          success: function(fileUrl) {
         *          },
         *          error: function(errMsg) {}
         *      });
         *
         * @param {Object} args 参数对象
         * @return {Object} 返回cloudtplus对象
         */
        scanFace: function(args) {
            args = args || {};
            window.Application.scanFace(args.success, args.error, {});
            return window.cloudtplus;
        },

		/**
		 * @method reload
		 * 重现加载
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.reload({
		 * 			success: function() {},
		 * 			error: function() {}
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		reload: function(args) {
			args = args || {};
			window.Application.reload(args.success, args.error);
			return window.cloudtplus;
		},

		/**
		 * @method reloadOfflineApp
		 * 重现加载离线应用
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.reload({
		 * 			success: function() {},
		 * 			error: function() {}
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		reloadOfflineApp: function(args) {
			args = args || {};
			window.Application.reloadOfflineApp(args.success, args.error, args.progress);
			return window.cloudtplus;
		},
		/**
		 * @method exitApp
		 * 退出页面
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.exitApp({
		 * 			success: function() {},
		 * 			error: function() {}
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		exitApp: function(args) {
			args = args || {};
			window.Application.exitApp(args.success, args.error);
			return window.cloudtplus;
		},

		/**
		 * @method getOfflinePicture
		 * 获取离线照片
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.getOfflinePicture({
		 * 			success: function(data) {
		 * 				// data: [{fileUrl:"", fileId:"", ..., errorMsg: ""}]
		 * 			},
		 * 			error: function(errMsg) {},
		 *			orgId: "",
		 * 			projectId: "",
		 * 			type: "",
		 * 			tag1: "",
		 * 			tag2: "",
		 * 			tag3: "",
		 * 			tag4: "",
		 * 			tag5: "",
		 * 			productType: "",
		 * 			moduleName: "",
		 * 			isPublic: false,
		 * 			sourceType: "CAMERA",	// 照片来源：CAMERA／PHOTOLIBRARY
		 * 			maxCount: 0,			// 最大照片数
		 * 			allowVideo: false,		// 允许录制短视频，默认值: false
		 * 			maxDuration: 8000,		// 限制录制时长，毫秒，默认8秒
		 *          cropRate: 0,            // 照片剪裁框宽高比，默认为0，表示不剪裁；值为1则剪裁框为正方形，值越大则剪裁框越扁平
		 * 			alwaysSave: false,		// 总是保存(拍照时，点击取消也保存)，默认值: false
		 *          watermark:"",
         *          waterColor:""
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		getOfflinePicture: function(args) {
			args = args || {};
			window.Application.getOfflinePicture(args.success, args.error, {
				orgId: args.orgId,
				projectId: args.projectId,
				type: args.type,
				tag1: args.tag1,
				tag2: args.tag2,
				tag3: args.tag3,
				tag4: args.tag4,
				tag5: args.tag5,
				productType: args.productType,
				moduleName: args.moduleName,
				isPublic: args.isPublic,
				sourceType: args.sourceType,
				maxCount: args.maxCount || args.maxBurstCount,	// 废弃maxBurstCount
				allowVideo: args.allowVideo,
				maxDuration: args.maxDuration,
				cropRate: args.cropRate,
				alwaysSave: args.alwaysSave,
				isTemp: args.isTemp,
				watermark:args.watermark,
				waterColor:args.waterColor
			});
			return window.cloudtplus;
		},

		/**
		 * @method getOfflineVideo
		 * 获取离线视频
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.getOfflineVideo({
		 * 			success: function(data) {
		 * 				// data: [{fileUrl:"", fileId:"", ..., errorMsg: ""}]
		 * 			},
		 * 			error: function(errMsg) {},
		 *			orgId: "",
		 * 			projectId: "",
		 * 			type: "",
		 * 			tag1: "",
		 * 			tag2: "",
		 * 			tag3: "",
		 * 			tag4: "",
		 * 			tag5: "",
		 * 			productType: "",
		 * 			moduleName: "",
		 * 			isPublic: false,
		 * 			shootMode: "",		// 录制模式，TAP/TAP_HOLD
		 * 			maxDuration: 8000	// 限制录制时长，毫秒，默认8秒
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		getOfflineVideo: function(args) {
			args = args || {};
			window.Application.getOfflineVideo(args.success, args.error, {
				orgId: args.orgId,
				projectId: args.projectId,
				type: args.type,
				tag1: args.tag1,
				tag2: args.tag2,
				tag3: args.tag3,
				tag4: args.tag4,
				tag5: args.tag5,
				productType: args.productType,
				moduleName: args.moduleName,
				isPublic: args.isPublic,
				shootMode: args.shootMode,
				maxDuration: args.maxDuration
			});
			return window.cloudtplus;
		},

		/**
		 * @method getOfflineAudio
		 * 获取离线音频
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.getOfflineAudio({
		 * 			success: function(data) {
		 * 				// data: [{fileUrl:"", fileId:"", ..., errorMsg: ""}]
		 * 			},
		 * 			error: function(errMsg) {},
		 *			orgId: "",
		 * 			projectId: "",
		 * 			type: "",
		 * 			tag1: "",
		 * 			tag2: "",
		 * 			tag3: "",
		 * 			tag4: "",
		 * 			tag5: "",
		 * 			productType: "",
		 * 			moduleName: "",
		 * 			isPublic: false,
		 * 			shootMode: "",		// 录制模式，TAP/TAP_HOLD
		 * 			maxDuration: 8000	// 限制录制时长，毫秒，默认8秒
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		getOfflineAudio: function(args) {
			args = args || {};
			window.Application.getOfflineAudio(args.success, args.error, {
				orgId: args.orgId,
				projectId: args.projectId,
				type: args.type,
				tag1: args.tag1,
				tag2: args.tag2,
				tag3: args.tag3,
				tag4: args.tag4,
				tag5: args.tag5,
				productType: args.productType,
				moduleName: args.moduleName,
				isPublic: args.isPublic,
				shootMode: args.shootMode,
				maxDuration: args.maxDuration
			});
			return window.cloudtplus;
		},

		/**
		 * @method removeOfflineRecord
		 * 根据属性删除离线记录
		 * 不允许全部删除
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.removeOfflineRecord({
		 * 			success: function(recordIds) {
		 * 				// 删除成功 recordIds: ["", ""]
		 * 			},
		 * 			error: function(errMsg) {},
		 * 			recordId: "", // ["", ""]
		 * 			orgId: "", // ["", ""]
		 * 			projectId: "", // ["", ""]
		 * 			type: "", // ["", ""]
		 * 			tag1: "", // ["", ""]
		 * 			tag2: "", // ["", ""]
		 * 			tag3: "", // ["", ""]
		 * 			tag4: "", // ["", ""]
		 * 			tag5: "", // ["", ""]
		 * 			uploaded: undefined
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		removeOfflineRecord: function(args) {
			args = args || {};
			window.Application.removeOfflineRecord(args.success, args.error, {
				recordId: args.recordId,
				orgId: args.orgId,
				projectId: args.projectId,
				type: args.type,
				tag1: args.tag1,
				tag2: args.tag2,
				tag3: args.tag3,
				tag4: args.tag4,
				tag5: args.tag5,
				uploaded: args.uploaded
			});
			return window.cloudtplus;
		},

		/**
		 * @method removeOfflineFile
		 * 根据属性删除离线文件
		 * 不允许全部删除
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.removeOfflineFile({
		 * 			success: function(fileIds) {
		 * 				// 删除成功 fileIds: ["", ""]
		 * 			},
		 * 			error: function(errMsg) {},
		 * 			fileId: "", // ["", ""]
		 * 			mediaType: "", // ["", ""]
		 * 			saveId: "", // ["", ""]
		 * 			orgId: "", // ["", ""]
		 * 			projectId: "", // ["", ""]
		 * 			type: "", // ["", ""]
		 * 			tag1: "", // ["", ""]
		 * 			tag2: "", // ["", ""]
		 * 			tag3: "", // ["", ""]
		 * 			tag4: "", // ["", ""]
		 * 			tag5: "", // ["", ""]
		 * 			uploaded: undefined
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		removeOfflineFile: function(args) {
			args = args || {};
			window.Application.removeOfflineFile(args.success, args.error, {
				fileId: args.fileId,
				mediaType: args.mediaType,
				saveId: args.saveId,
				orgId: args.orgId,
				projectId: args.projectId,
				type: args.type,
				tag1: args.tag1,
				tag2: args.tag2,
				tag3: args.tag3,
				tag4: args.tag4,
				tag5: args.tag5,
				uploaded: args.uploaded
			});
			return window.cloudtplus;
		},

		/**
		 * @method updateOfflineRecord
		 * 根据recordId，修改离线记录
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.updateOfflineRecord({
		 * 			success: function(successData, errorData) {
		 * 				// successData: [{recordId:"", ..., uploaded: false, files:[]}]
		 * 				// errorData: []
		 * 			},
		 * 			error: function(errMsg) {},
		 * 			progress: function(value, info) {
		 * 				// value: 0~1
		 * 				// info: null 或 {success:true, data:{...}}
		 * 			},
		 * 			recordId: "",
		 *			data: "",
		 *			orgId: "",
		 * 			projectId: "",
		 * 			type: "",
		 * 			tag1: "",
		 * 			tag2: "",
		 * 			tag3: "",
		 * 			tag4: "",
		 * 			tag5: "",
		 * 			lastTime: undefined,
		 * 			uploaded: undefined,
		 * 			errorMsg: "",
		 * 			uploadUrl: "",
		 * 			files: ["", ""],
		 * 			items: undefined
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		updateOfflineRecord: function(args) {
			args = args || {};
			window.Application.updateOfflineRecord(args.success, args.error, args.progress, {
				recordId: args.recordId,
				data: args.data,
				orgId: args.orgId,
				projectId: args.projectId,
				type: args.type,
				tag1: args.tag1,
				tag2: args.tag2,
				tag3: args.tag3,
				tag4: args.tag4,
				tag5: args.tag5,
				lastTime: args.lastTime,
				uploaded: args.uploaded,
				errorMsg: args.errorMsg,
				uploadUrl: args.uploadUrl,
				files: args.files,
				items: args.items
			});
			return window.cloudtplus;
		},

		/**
		 * @method updateOfflineFile
		 * 根据fileId，更新离线文件
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.updateOfflineFile({
		 * 			success: function(successData, errorData) {
		 * 				// successData: [{fileUrl:"", fileId:"", ..., errorMsg: ""}]
		 * 				// errorData: []
		 * 			},
		 * 			error: function(errMsg) {},
		 * 			progress: function(value, info) {
		 * 				// value: 0~1
		 * 				// info: null 或 {success:true, data:{...}}
		 * 			},
		 * 			fileId: "",
		 *			saveId: "",
		 *			mediaType: "",
		 *			orgId: "",
		 * 			projectId: "",
		 * 			type: "",
		 * 			tag1: "",
		 * 			tag2: "",
		 * 			tag3: "",
		 * 			tag4: "",
		 * 			tag5: "",
		 * 			lastTime: undefined,
		 * 			uploaded: undefined,
		 * 			errorMsg: "",
		 *			productType: "",
		 *			moduleName: "",
		 *			isPublic: false,
		 * 			items: undefined
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		updateOfflineFile: function(args) {
			args = args || {};
			window.Application.updateOfflineFile(args.success, args.error, args.progress, {
				fileId: args.fileId,
				saveId: args.saveId,
				mediaType: args.mediaType,
				orgId: args.orgId,
				projectId: args.projectId,
				type: args.type,
				tag1: args.tag1,
				tag2: args.tag2,
				tag3: args.tag3,
				tag4: args.tag4,
				tag5: args.tag5,
				lastTime: args.lastTime,
				uploaded: args.uploaded,
				errorMsg: args.errorMsg,
				productType: args.productType,
				moduleName: args.moduleName,
				isPublic: args.isPublic,
				items: args.items
			});
			return window.cloudtplus;
		},

		/**
		 * @method getOfflineRecord
		 * 根据属性获取离线记录
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.getOfflineRecord({
		 * 			success: function(data) {
		 * 				// data: [{recordId:"", ..., errorMsg: "", files:[]}]
		 * 			},
		 * 			error: function(errMsg) {},
		 * 			recordId: "", // ["", ""]
		 * 			orgId: "", // ["", ""]
		 * 			projectId: "", // ["", ""]
		 * 			type: "", // ["", ""]
		 * 			tag1: "", // ["", ""]
		 * 			tag2: "", // ["", ""]
		 * 			tag3: "", // ["", ""]
		 * 			tag4: "", // ["", ""]
		 * 			tag5: "", // ["", ""]
		 * 			uploaded: undefined,
		 * 			files: "" // ["", ""]
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		getOfflineRecord: function(args) {
			args = args || {};
			window.Application.getOfflineRecord(args.success, args.error, {
				recordId: args.recordId,
				orgId: args.orgId,
				projectId: args.projectId,
				type: args.type,
				tag1: args.tag1,
				tag2: args.tag2,
				tag3: args.tag3,
				tag4: args.tag4,
				tag5: args.tag5,
				uploaded: args.uploaded,
				files: args.files
			});
			return window.cloudtplus;
		},

		/**
		 * @method getOfflineFile
		 * 根据属性获取离线文件
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.getOfflineFile({
		 * 			success: function(data) {
		 * 				// data: [{fileUrl:"", fileId:"", ..., errorMsg: ""}]
		 * 			},
		 * 			error: function(errMsg) {},
		 * 			fileId: "", // ["", ""]
		 * 			mediaType: "", // ["", ""]
		 * 			saveId: "", // ["", ""]
		 * 			orgId: "", // ["", ""]
		 * 			projectId: "", // ["", ""]
		 * 			type: "", // ["", ""]
		 * 			tag1: "", // ["", ""]
		 * 			tag2: "", // ["", ""]
		 * 			tag3: "", // ["", ""]
		 * 			tag4: "", // ["", ""]
		 * 			tag5: "", // ["", ""]
		 * 			uploaded: undefined
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		getOfflineFile: function(args) {
			args = args || {};
			window.Application.getOfflineFile(args.success, args.error, {
				fileId: args.fileId,
				mediaType: args.mediaType,
				saveId: args.saveId,
				orgId: args.orgId,
				projectId: args.projectId,
				type: args.type,
				tag1: args.tag1,
				tag2: args.tag2,
				tag3: args.tag3,
				tag4: args.tag4,
				tag5: args.tag5,
				uploaded: args.uploaded
			});
			return window.cloudtplus;
		},

		/**
		 * @method uploadOfflineRecord
		 * 根据recordId，上传离线记录及关联文件
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.uploadOfflineRecord({
		 * 			success: function(successData, errorData) {
		 * 				// successData: [{recordId:"", ..., errorMsg: "", files:[]}]
		 * 				// errorData: []
		 * 			},
		 * 			error: function(errMsg) {},
		 * 			progress: function(value, info) {
		 * 				// value: 0~1
		 * 				// info: null 或 {success:true, data:{...}}
		 * 			},
		 * 			recordId: "",
		 * 			uploadUrl: "",
		 * 			productType: "",	// 默认值: appId/UNKNOWN
		 * 			moduleName: "",		// 默认值: cloudtplus/ios 或 cloudtplus/android
		 * 			isPublic: false,	// 默认值: false
		 * 			items: [{}, {}]		// 批量上传
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		uploadOfflineRecord: function(args) {
			args = args || {};
			window.Application.uploadOfflineRecord(args.success, args.error, args.progress, {
				recordId: args.recordId,
				uploadUrl: args.uploadUrl,
				productType: args.productType,
				moduleName: args.moduleName,
				isPublic: args.isPublic,
				items: args.items
			});
			return window.cloudtplus;
		},

		/**
		 * @method uploadOfflineFile
		 * 根据fileId，上传离线文件
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.uploadOfflineFile({
		 * 			success: function(successData, errorData) {
		 * 				// successData: [{fileUrl:"", fileId:"", ..., errorMsg: ""}]
		 * 				// errorData: []
		 * 			},
		 * 			error: function(errMsg) {},
		 * 			progress: function(value, info) {
		 * 				// value: 0~1
		 * 				// info: null 或 {success:true, data:{...}}
		 * 			},
		 * 			fileId: "",
		 * 			productType: "", // 默认值: appId/UNKNOWN
		 * 			moduleName: "", // 默认值: cloudtplus/ios 或 cloudtplus/android
		 * 			isPublic: false // 默认值: false
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		uploadOfflineFile: function(args) {
			args = args || {};
			window.Application.uploadOfflineFile(args.success, args.error, args.progress, {
				fileId: args.fileId,
				productType: args.productType,
				moduleName: args.moduleName,
				isPublic: args.isPublic,
				items: args.items
			});
			return window.cloudtplus;
		},

		/**
		 * @method updateOfflineDict
		 * 根据name更新离线字典，并记录版本号
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.updateOfflineDict({
		 * 			success: function() {},
		 * 			error: function(errMsg) {},
		 * 			name: "",
		 * 			version: "",
		 * 			data: ""
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		updateOfflineDict: function(args) {
			args = args || {};
			window.cloudtplus.removeOfflineDict({
				success: (function(scallback, ecallback, name, version, data) {
					return function() {
						var maxDictLength = 1024 * 1024; // 大于1M分开存储
						if (data && data.length > maxDictLength) {
							var count = 0;
							var errCount = 0;
							var length = Math.ceil(data.length / maxDictLength);
							for (var i = 0; i < length; i++) {
								var d = data.substring(maxDictLength * i, maxDictLength * (i + 1));
								window.Application.updateOfflineDict((function() {
									return function() {
										count++;
										if (count === length) {
											window.Application.updateOfflineDict(scallback, ecallback, {
												name: name,
												version: version,
												data: "$$$Count:" + length
											});
										}
									}
								})(), (function() {
									return function(errMsg) {
										errCount++;
										if (errCount === 1) {
											ecallback && ecallback.call(this, errMsg);
										}
									}
								})(), {
									name: name + "$$$" + i,
									version: version,
									data: d
								});
							}
						} else {
							window.Application.updateOfflineDict(scallback, ecallback, {
								name: name,
								version: version,
								data: data
							});
						}
					}
				})(args.success, args.error, args.name, args.version, args.data),
				error: (function(ecallback) {
					return function(errMsg) {
						ecallback && ecallback.call(this, errMsg);
					}
				})(args.error),
				name: args.name
			});
			return window.cloudtplus;
		},

		/**
		 * @method removeOfflineDict
		 * 根据name删除离线字典
		 * 允许全部删除
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.removeOfflineDict({
		 * 			success: function() {},
		 * 			error: function(errMsg) {},
		 * 			name: ""
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		removeOfflineDict: function(args) {
			args = args || {};
			var successCallback = (function(scallback, ecallback, name) {
				return function(data) {
					var names = [name];
					if (data && data.indexOf("$$$Count:") === 0) {
						var length = Number(data.replace("$$$Count:", ""));
						for (var i = 0; i < length; i++) {
							names.push(name + "$$$" + i);
						}
					}
					window.Application.removeOfflineDict(scallback, ecallback, {
						name: names
					});
				}
			})(args.success, args.error, args.name);
			window.Application.getOfflineDict(successCallback, args.error, {
				name: args.name
			});
			return window.cloudtplus;
		},

		/**
		 * @method getOfflineDictVersion
		 * 根据name获取离线字典的版本号
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.getOfflineDictVersion({
		 * 			success: function() {},
		 * 			error: function(errMsg) {},
		 * 			name: ""
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		getOfflineDictVersion: function(args) {
			args = args || {};
			window.Application.getOfflineDictVersion(args.success, args.error, {
				name: args.name
			});
			return window.cloudtplus;
		},

		/**
		 * @method getOfflineDict
		 * 根据name获取离线字典
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.getOfflineDict({
		 * 			success: function() {},
		 * 			error: function(errMsg) {},
		 * 			name: ""
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		getOfflineDict: function(args) {
			args = args || {};
			var successCallback = (function(scallback, ecallback, name) {
				return function(data) {
					if (data && data.indexOf("$$$Count:") === 0) {
						var parts = [];
						var count = 0;
						var errCount = 0;
						var length = Number(data.replace("$$$Count:", ""));
						for (var i = 0; i < length; i++) {
							parts.push("");
							window.Application.getOfflineDict((function(ii) {
								return function(data) {
									parts[ii] = data;
									count++;
									if (count === length) {
										scallback && scallback.call(this, parts.join(""));
									}
								}
							})(i), (function() {
								return function(errMsg) {
									errCount++;
									if (errCount === 1) {
										ecallback && ecallback.call(this, errMsg);
									}
								}
							})(), {
								name: name + "$$$" + i
							});							
						}
					} else {
						scallback && scallback.call(this, data);
					}
				}
			})(args.success, args.error, args.name);
			window.Application.getOfflineDict(successCallback, args.error, {
				name: args.name
			});
			return window.cloudtplus;
		},
       /**
		 * @method ajax
		 * 解决跨域问题，在壳上封装的ajax请求
		 *
		 * Example:
		 *
		 * 		window.cloudtplus.ajax({
		 * 			success: function() {},
		 * 			error: function(errMsg) {},
		 * 			url: "",
         *          headers: {},
		 * 			data: "",
		 * 			type: ""	// 默认值: GET, 	其他: POST/PUT/DELETE
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		ajax: function(args) {
			args = args || {};
			window.Application.ajax(args.success, args.error, {
				url: args.url,
				data: args.data,
                headers: args.headers,
				type: args.type
			});
			return window.cloudtplus;
		},
		/**
		 * @method getDataUrl
		 * 解决跨协议显示图片问题
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.getDataUrl({
		 * 			success: function(dataUrl) {},
		 * 			error: function(errMsg) {},
		 * 			url: "",
		 * 			force: false
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		getDataUrl: function(args) {
			args = args || {};
			window.Application.getDataUrl(args.success, args.error, {
				url: args.url,
				force: args.force
			});
			return window.cloudtplus;
		},

		/**
		 * @method getGuid
		 * 获取新guid
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.getGuid({
		 * 			success: function(guid) {},
		 * 			error: function(errMsg) {}
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		getGuid: function(args) {
			args = args || {};
			window.Application.getGuid(args.success, args.error);
			return window.cloudtplus;
		},

		/**
		 * @method getContextInfo
		 * 获取上下文信息
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.getContextInfo({
		 * 			success: function(data) {
		 * 				// data: {userId:"", userName:"", tenantId:"", tenantName:"", serverId:"", appId:""}
		 * 			},
		 * 			error: function(errMsg) {}
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		getContextInfo: function(args) {
			args = args || {};
			window.Application.getContextInfo(args.success, args.error);
			return window.cloudtplus;
		},

		/**
		 * @method checkSession
		 * 检查当前会话状态
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.checkSession({
		 * 			success: function(networkStatus) {
		 * 				// 会话可用，networkStatus: "WiFi" "WWAN"
		 * 			},
		 * 			error: function(errMsg) {
		 * 				// 会话不可用，errMsg为出错信息，例如：网络不可用
		 * 			},
		 * 			autoLogin: false	// 是否自动登录
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		checkSession: function(args) {
			args = args || {};
			window.Application.checkSession(args.success, args.error, {
				autoLogin: args.autoLogin
			});
			return window.cloudtplus;
		},

		/**
		 * @method fileOpen
		 * 打开文件
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.fileOpen({
		 * 			success: function() {},
		 * 			error: function(errMsg) {},
		 * 			url: "file:///",	// 文件路径
		 * 			fileName: ""		// 显示名称
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		fileOpen: function(args) {
			args = args || {};
			window.FileOpener.open(args.url || "", args.success, args.error, args.fileName || "");
			return window.cloudtplus;
		},

		/**
		 * @method fileBrowser
		 * 浏览文件
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.fileBrowser({
		 * 			success: function(selected) {
		 * 				// selected: [{}]
		 * 			},
		 * 			error: function(errMsg) {},
		 * 			delete: function(deleted) {
		 * 				// deleted: [{}]
		 * 			},
		 * 			import: function() {
		 * 				// window.cloudtplus.fileBrowserRefresh({items: []});
		 * 			},
		 * 			title: "",
		 * 			mode: "",	// "BROWSE", "SELECT"
		 * 			allowDelete: false,		// 仅在"BROWSE"模式下起作用
		 * 			allowExport: false,		// 仅在"BROWSE"模式下起作用
		 * 			allowImport: false,		// 仅在"BROWSE"模式下起作用
		 * 			maxCount: 0,			// 仅在"SELECT"模式下起作用
		 * 			items: [{
		 * 				groupName: "",
		 * 				url: "",
		 * 				tag: "",
		 * 				tagColor: "",
		 * 				tagBackgroundColor: "",
		 * 				description: "",
		 * 				noSelect: false
		 * 			}]
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		fileBrowser: function(args) {
			args = args || {};
			window.Application.fileBrowser(args.success, args.error, args.delete, args.import, {
				title: args.title,
				mode: args.mode,
				allowDelete: args.allowDelete,
				allowExport: args.allowExport || args.allowSave,
				allowImport: args.allowImport,
				maxCount: args.maxCount,
				items: args.items
			});
			return window.cloudtplus;
		},

		/**
		 * @method fileBrowserRefresh
		 * 刷新当前浏览文件内容
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.fileBrowserRefresh({
		 * 			success: function() {},
		 * 			error: function(errMsg) {},
		 * 			items: [{
		 * 				groupName: "",
		 * 				url: "",
		 * 				tag: "",
		 * 				tagColor: "",
		 * 				tagBackgroundColor: "",
		 * 				description: "",
		 * 				noSelect: false
		 * 			}]
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		fileBrowserRefresh: function(args) {
			args = args || {};
			window.Application.fileBrowserRefresh(args.success, args.error, {
				items: args.items
			});
			return window.cloudtplus;
		},

		/**
         * @method cameraLPR
         * 调用扫描车牌号插件
         *
         * Example:
         *
         * 	    window.cloudtplus.cameraLPR({
         *          success: function(data) {
         * 	         // data: [{carNumber:"",recogRate:"",recogFileUrl: ""}]
         *          },
         * 	    	error: function(errMsg) {}
         * 	    });
         *
         * @param {Object} args 参数对象
         * @return {Object} 返回cloudtplus对象
         */
        cameraLPR: function(args) {
            args = args || {};
            window.Application.cameraLPR(args.success,args.error);
            return window.cloudtplus;
        },

		/**
		 * @method browseImages
		 * 浏览图片
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.browseImages({
		 * 			success: function(deleted) {
		 * 				// deleted: [0, 1]
		 * 			},
		 * 			error: function() {},
		 * 			urls: [""],
		 * 			startIndex: 0,
		 * 			allowDelete: false
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		browseImages: function(args) {
			window.console && window.console.warn && window.console.warn("window.cloudtplus.browseImages已不推荐使用，请更换为browsePicture");
			args = args || {};
			window.ImageBrowser.browseImages(args.success, args.error, {
				urls: args.urls,
				startIndex: args.startIndex,
				allowDelete: args.allowDelete
			});
			return window.cloudtplus;
		},

		/**
		 * @method browsePicture
		 * 浏览图片
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.browsePicture({
		 * 			success: function() {},
		 * 			error: function(errMsg) {},
		 * 			items: [{
		 * 				url: "",
		 * 				description: ""
		 * 			}],
		 * 			startIndex: 0
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		browsePicture: function(args) {
			args = args || {};
			window.Application.browsePicture(args.success, args.error, {
				items: args.items,
				startIndex: args.startIndex
			});
			return window.cloudtplus;
		},

		/**
		 * @method browseVideo
		 * 浏览视频
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.browseVideo({
		 * 			success: function() {},
		 * 			error: function(errMsg) {},
		 * 			title: "",
		 * 			url: ""
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		browseVideo: function(args) {
			args = args || {};
			window.Application.browseVideo(args.success, args.error, {
				title: args.title,
				url: args.url
			});
			return window.cloudtplus;
		},

		/**
		 * @method browseAudio
		 * 浏览音频
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.browseAudio({
		 * 			success: function() {},
		 * 			error: function(errMsg) {},
		 * 			title: "",
		 * 			url: ""
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		browseAudio: function(args) {
			args = args || {};
			window.Application.browseAudio(args.success, args.error, {
				title: args.title,
				url: args.url
			});
			return window.cloudtplus;
		},

		/**
		 * @method downloadBundleBySaveId
		 * 根据saveId下载包，返回解压后的路径
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.downloadBundleBySaveId({
		 * 			success: function(path) {
		 * 				// path: file:///xxxx/xxx/   最后有一个斜杠
		 * 			},
		 * 			error: function(errMsg) {},
		 * 			progress: function(value) {
		 * 				// value: 0~1
		 * 			},
		 * 			productType: "",
		 * 			saveId: "",
		 * 			force: false
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		downloadBundleBySaveId: function(args) {
			args = args || {};
			window.Application.downloadBundleBySaveId(args.success, args.error, args.progress, {
				productType: args.productType,
				saveId: args.saveId,
				force: args.force
			});
			return window.cloudtplus;
		},

		/**
		 * @method checkBundleBySaveId
		 * 根据saveId检查包是否存在
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.checkBundleBySaveId({
		 * 			success: function(result) {
		 * 				// 离线包信息 result: [{saveId: "", path:"file:///xxxx/xxx/", success: true}]
		 * 			},
		 * 			error: function(errMsg) {},
		 * 			productType: "",
		 * 			saveId: "" // ["", ""]
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		checkBundleBySaveId: function(args) {
			args = args || {};
			window.Application.checkBundleBySaveId(args.success, args.error, {
				productType: args.productType,
				saveId: args.saveId
			});
			return window.cloudtplus;
		},

		/**
		 * @method removeBundleBySaveId
		 * 根据saveId删除包
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.removeBundleBySaveId({
		 * 			success: function(result) {
		 * 				// 删除信息 result: [{saveId: "", path:"file:///xxxx/xxx/", success: true}]
		 * 			},
		 * 			error: function(errMsg) {},
		 * 			productType: "",
		 * 			saveId: "" // ["", ""]
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		removeBundleBySaveId: function(args) {
			args = args || {};
			window.Application.removeBundleBySaveId(args.success, args.error, {
				productType: args.productType,
				saveId: args.saveId
			});
			return window.cloudtplus;
		},

		/**
		 * @method removeBundleAll
		 * 删除全部包
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.removeBundleAll({
		 * 			success: function(result) {
		 * 				// 删除信息 result: [{saveId: "", path:"file:///xxxx/xxx/", success: true}]
		 * 			},
		 * 			error: function(errMsg) {},
		 * 			productType: ""
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		removeBundleAll: function(args) {
			args = args || {};
			window.Application.removeBundleAll(args.success, args.error, {
				productType: args.productType
			});
			return window.cloudtplus;
		},

		/**
		 * @method readFile
		 * 读取文件
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.readFile({
		 * 			success: function(data) {},
		 * 			error: function(errMsg) {},
		 * 			url: "file:///"				// 文件路径
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		readFile: function(args) {
			args = args || {};
			window.Application.readFile(args.success, args.error, {
				url: args.url
			});
			return window.cloudtplus;
		},

		/**
		 * @method showShareMenu
		 * 显示分享菜单
		 * 
		 * Example:
		 * 
		 * 		window.cloudtplus.showShareMenu({
		 * 			success: function() {},
		 * 			error: function(errMsg) {},
		 * 			platformTypes: [""], // "WechatSession", "WechatTimeLine", "WechatFavorite", "QQ", "Qzone"
		 * 			title: "",
		 * 			description: "",
		 * 			thumbUrl: "", // "appIcon", "applicationIcon", “file:///”, “https://”
		 * 			url: ""
		 * 		});
		 *
		 * @param {Object} args 参数对象
		 * @return {Object} 返回cloudtplus对象
		 */
		showShareMenu: function(args) {
			args = args || {};
			window.Application.showShareMenu(args.success, args.error, {
				platformTypes: args.platformTypes,
				title: args.title,
				description: args.description,
				thumbUrl: args.thumbUrl,
				url: args.url
			});
			return window.cloudtplus;
		},

		/**
         * @method startMapNavi
         * 显示分享菜单
         *
         * Example:
         *
         * 		window.cloudtplus.showMapNavi({
         * 			success: function() {},
         * 			error: function(errMsg) {},
         * 			startName: "我的位置",
         *          startLat: "",
         *          startLon: "",
         *          endName: "东郡华城广场",
         *          endLat: "28.187519",
         *          endLon: "113.031738"
         * 		});
         *
         * @param {Object} args 参数对象
         * @return {Object} 返回cloudtplus对象
         */
        showMapNavi: function(args) {
            args = args || {};
            window.Application.showMapNavi(args.success, args.error, {
                startName: args.startName,
                startLat: args.startLat,
                startLon: args.startLon,
                endName: args.endName,
                endLat: args.endLat,
                endLon: args.endLon
            });
            return window.cloudtplus;
        },
        /**
         * Vibrates the device for a given amount of time.
         * @param {Integer} param  The number of milliseconds to vibrate
         * Example:
         *
         * 		window.cloudtplus.vibrate({
         * 			success: function() {},
         * 			error: function(errMsg) {},
         * 			time: 200
         * 		});
         *
         * @param {Object} args 参数对象
         * @return {Object} 返回cloudtplus对象
         */
        vibrate: function(args) {
            args = args || {};
            window.Application.vibrate(args.success, args.error, {
               time: args.time
            });
            return window.cloudtplus;
        },

         startGPS: function(args) {
            args = args || {};
            window.Application.startGPS(args.success, args.error, {
                orgId: args.orgId,
                projectId: args.projectId,
                tag1: args.tag1,
                tag2: args.tag2,
                tag3: args.tag3,
                tag4: args.tag4,
                tag5: args.tag5
            });
            return window.cloudtplus;
        },

        stopGPS: function(args) {
            args = args || {};
            window.Application.stopGPS(args.success, args.error,{});
            return window.cloudtplus;
        },


        initBluetooth: function(args) {
            args = args || {};
            window.Application.initBluetooth(args.success, args.error,{});
            return window.cloudtplus;
        },

        blueWriteChara: function(args) {
            args = args || {};
            window.Application.blueWriteChara(args.success, args.error,{});
            return window.cloudtplus;
        },
         /**
         *window.cloudtplus.getBlueData({
         * 			success: function() {},
         * 			error: function(errMsg) {},
         * 			bleState: "getConnectState"   //获取蓝牙数据传空 ""
         * 		});
         **/
        getBlueData: function(args) {
            args = args || {};
            window.Application.getBlueData(args.success, args.error,{
              bleState: args.bleState});
            return window.cloudtplus;
        },

        connectBlueTooth: function(args) {
            args = args || {};
            window.Application.connectBlueTooth(args.success, args.error,{});
            return window.cloudtplus;
        },
       /**
         * @method removeGPSRecords
         * 根据属性删除坐标记录
         * 不允许全部删除
         *
         * Example:
         *window.cloudtplus.bluetoothPrinter({
         *   success: function(successData) {
         *       alert({
         *           successData: successData
         *       });
         *   },
         *   error: function(errMsg) {
         *       alert(errMsg);
         *   },
         *   projectName:"广州项目",
         *   oddNumber:123456789111,
         *   printNumber:"1-1",
         *   productionUnit:"北京圣源春凯商贸有限公司",
         *   carNumb:"京P79581",
         *   storageRoom:"",
         *   note:"",
         *   dataList:[{"name":"圆钢Q235","waybill":"100吨","realbill":"100吨","confirm":"100吨"}],
         *   acceptor:"产品管理员3",
         *   acceptTime:"2018-05-25 9:42"
         *});
         **/
        bluetoothPrinter: function(args) {
            args = args || {};
            if(args.storageRoom === undefined) args.storageRoom="";
            window.Application.bluetoothPrinter(args.success, args.error,
               {projectName: args.projectName,
                oddNumber: args.oddNumber,
                printNumber:args.printNumber,
                productionUnit: args.productionUnit,
                carNumb: args.carNumb,
                storageRoom: args.storageRoom,
                note: args.note,
                dataList: args.dataList,
                acceptor: args.acceptor,
                acceptTime: args.acceptTime
               });
            return window.cloudtplus;
        },

       /**
         * @method searchBluePrinter
         * 调用扫描车牌号插件
         *
         * Example:
         *
         * 	    window.cloudtplus.searchBluePrinter({
         *          success: function(data) {},
         * 	    	error: function(errMsg) {}
         * 	    });
         *
         * @param {Object} args 参数对象
         * @return {Object} 返回cloudtplus对象
         */
        searchBluePrinter: function(args) {
            args = args || {};
            window.Application.searchBluePrinter(args.success, args.error,{});
            return window.cloudtplus;
        },

        searchGPSRecords: function(args) {
            args = args || {};
            window.Application.searchGPSRecords(args.success, args.error, {
                date: args.date,
                recordId: args.recordId,
                orgId: args.orgId,
                projectId: args.projectId,
                tag1: args.tag1,
                tag2: args.tag2,
                tag3: args.tag3,
                tag4: args.tag4,
                tag5: args.tag5,
                uploaded: args.uploaded
            });
            return window.cloudtplus;
        },

        /**
         * @method removeGPSRecords
         * 根据属性删除坐标记录
         * 不允许全部删除
         *
         * Example:
         *
         * 		window.cloudtplus.removeGPSRecords({
         * 			success: function(recordIds) {
         * 				// 删除成功 recordIds: ["", ""]
         * 			},
         * 			error: function(errMsg) {},
         * 			recordId: "", // ["", ""]
         * 			orgId: "", // ["", ""]
         * 			projectId: "", // ["", ""]
         * 			date: "", // ""
         * 			tag1: "", // ["", ""]
         * 			tag2: "", // ["", ""]
         * 			tag3: "", // ["", ""]
         * 			tag4: "", // ["", ""]
         * 			tag5: "", // ["", ""]
         * 			uploaded: undefined
         * 		});
         *
         * @param {Object} args 参数对象
         * @return {Object} 返回cloudtplus对象
         */
        removeGPSRecords: function(args) {
            args = args || {};
            window.Application.removeGPSRecords(args.success, args.error, {
                recordId: args.recordId,
                orgId: args.orgId,
                projectId: args.projectId,
                date: args.date,
                tag1: args.tag1,
                tag2: args.tag2,
                tag3: args.tag3,
                tag4: args.tag4,
                tag5: args.tag5,
                uploaded: args.uploaded
            });
            return window.cloudtplus;
        },
        /**
         * @method locationPoint
         * 获取位置坐标点
         *
         * Example:
         *
         * 		window.cloudtplus.locationPoint({
         * 			success: function() {},
         * 			error: function() {}
         * 		});
         *
         * @param {Object} args 参数对象
         * @return {Object} 返回JsonArray对象 [Latitude,Longitude]
         */
        locationPoint: function(args) {
            args = args || {};
            window.Application.locationPoint(args.success, args.error,{});
            return window.cloudtplus;
        },

        currentLocation: function(args) {
            args = args || {};
            window.Application.currentLocation(args.success, args.error, {
                orgId: args.orgId,
                projectId: args.projectId,
                tag1: args.tag1,
                tag2: args.tag2,
                tag3: args.tag3,
                tag4: args.tag4,
                tag5: args.tag5
            });
            return window.cloudtplus;
        }
	};

	/**
	 * 接口调试
	 * 
	 * Example:
	 * 
	 * 		window.cloudtplus.debug = true;
	 * 		window.cloudtplus.debugFilter = ['ajax'];
	 * 		window.cloudtplus.debugInfo; // [{"start": "2016-11-15T01:58:01.941Z", "end": "2016-11-15T01:58:20.420Z", "name": "ajax", success: true, args: {}, result: {}, text: ""}]
	 * 
	 */
	(function(ctp) {
		var formatDate = function(date) {
			return date.getFullYear() + '年' + date.getMonth() + '月' + date.getDate() + '日 ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ' ' + date.getMilliseconds();
		};
		var getType = function(v) {
			return Object.prototype.toString.call(v).replace("[object ", "").replace("]", "");
		};
		var log = function(start, end, name, success, args, result) {
			if (!ctp.debugInfo) {
				ctp.debugInfo = [];
			}
			var o = {
				start: start,
				end: end,
				name: name,
				success: success,
				args: args,
				result: result,
				text: '开始时间:' + formatDate(start) + ' 结束时间:' + formatDate(end) + ' 耗时:' + (Number(end) - Number(start)) + '毫秒 执行方法:' + name + ' 执行结果:' + (success ? '成功' : '失败')
			};
			if (name == 'ajax' && args) {
				o.text += ' 请求地址:' + args.url;
			}
			if (getType(ctp.debugFilter) != 'Array' || ctp.debugFilter.length == 0 || ctp.debugFilter.indexOf(name) >= 0) {
				ctp.debugInfo.push(o);
			}
		};
		var init_args = function(name, args) {
			args = args || {};

			if (ctp.debug) {
				args.success = (function(callback, name, start) {
					return function(data) {
						log(start, new Date(), name, true, args, data);
						return callback && callback.apply(this, arguments)
					}
				})(args.success, name, new Date());
				args.error = (function(callback, name, start) {
					return function(msg) {
						log(start, new Date(), name, false, args, msg);
						return callback && callback.apply(this, arguments)
					}
				})(args.error, name, new Date());
			}

			return args
		};
		for (i in ctp) {
			var item = ctp[i];
			if (getType(item) == 'Function') {
				if (i.indexOf('on') != 0) {
					ctp[i] = (function(name, fn) {
						return function(args) {
							args = init_args(name, args);
							return fn.call(this, args);
						}
					})(i, item);
				}
			}
		}
	})(window.cloudtplus);
})();