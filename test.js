switch (status) {
                                            case -2:
                                                if (tthis.filterInt(now - date(list[idx3].lastModified)) >= 43200000) {
                                                    Service.setDeviceTarget(0, null, list[idx3].id, function(err, result){
                                                        if (err){
                                                            console.error(err);  
                                                        }else{
                                                            console.success(result);
                                                        }
                                                        f3(++idx3);
                                                    });
                                                }else if (tthis.filterInt(now) >= date(list[idx3].lastModified)) {
                                                    Service.createCron(list[idx3], "event", "cancel", function (error, cron){
                                                        if (error) {
                                                            console.error(error);
                                                        }else{
                                                            Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                            Service.createCron(list[idx3], "event", "cancelled", function(error2, cron2){
                                                                if (error2) {
                                                                    console.error(error2);
                                                                }else{
                                                                    Service.startCron(cron2.uniqueId, cron2.cronJobObj);
                                                                }	
                                                                f3(++idx3);
                                                            });
                                                        }
                                                    });
                                                }else if (tthis.filterInt(now) < date(list[idx3].recoveryDate) && tthis.filterInt(now) >= date(list[idx3].startDate)) {
                                                    Service.createCron(list[idx3], "event", "cancel", function (error, cron){
                                                        if (error) {
                                                            console.error(error);
                                                        }else{
                                                            Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                            Service.createCron(list[idx3], "event", "cancelled", function(error2, cron2){
                                                                if (error2) {
                                                                    console.error(error2);
                                                                }else{
                                                                    Service.startCron(cron2.uniqueId, cron2.cronJobObj);
                                                                }	
                                                                f3(++idx3);
                                                            });
                                                        }
                                                    });
                                                }else if (tthis.filterInt(now) < date(list[idx3].startDate)){
                                                    Service.createCron(list[idx3], "event", "cancel", function (error, cron){
                                                        if (error) {
                                                            console.error(error);
                                                        }else{
                                                            Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                            Service.createCron(list[idx3], "event", "cancelled", function(error2, cron2){
                                                                if (error2) {
                                                                    console.error(error2);
                                                                }else{
                                                                    Service.startCron(cron2.uniqueId, cron2.cronJobObj);
                                                                }	
                                                                f3(++idx3);
                                                            });
                                                        }
                                                    });
                                                }
                                            break;
                                            case -1:
                                                if (tthis.filterInt(now - date(list[idx3].lastModified)) >= 43200000) {
                                                    Service.setDeviceTarget(0, null, list[idx3].id, function(err, result){
                                                        if (err){
                                                            console.error(err);  
                                                        }else{
                                                            console.success(result);
                                                        }
                                                        f3(++idx3);
                                                    });
                                                }else if (tthis.filterInt(now) >= date(list[idx3].lastModified)) {
                                                    Service.createCron(list[idx3], "event", "cancel", function (error, cron){
                                                        if (error) {
                                                            console.error(error);
                                                        }else{
                                                            Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                            Service.createCron(list[idx3], "event", "cancelled", function(error2, cron2){
                                                                if (error2) {
                                                                    console.error(error2);
                                                                }else{
                                                                    Service.startCron(cron2.uniqueId, cron2.cronJobObj);
                                                                }	
                                                                f3(++idx3);
                                                            });
                                                        }
                                                    });
                                                }else if (tthis.filterInt(now) < date(list[idx3].recoveryDate) && tthis.filterInt(now) >= date(list[idx3].startDate)) {
                                                    Service.createCron(list[idx3], "event", "cancel", function (error, cron){
                                                        if (error) {
                                                            console.error(error);
                                                        }else{
                                                            Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                            Service.createCron(list[idx3], "event", "cancelled", function(error2, cron2){
                                                                if (error2) {
                                                                    console.error(error2);
                                                                }else{
                                                                    Service.startCron(cron2.uniqueId, cron2.cronJobObj);
                                                                }	
                                                                f3(++idx3);
                                                            });
                                                        }
                                                    });
                                                }else if (tthis.filterInt(now) < date(list[idx3].startDate)){
                                                    Service.createCron(list[idx3], "event", "cancel", function (error, cron){
                                                        if (error) {
                                                            console.error(error);
                                                        }else{
                                                            Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                            Service.createCron(list[idx3], "event", "cancelled", function(error2, cron2){
                                                                if (error2) {
                                                                    console.error(error2);
                                                                }else{
                                                                    Service.startCron(cron2.uniqueId, cron2.cronJobObj);
                                                                }	
                                                                f3(++idx3);
                                                            });
                                                        }
                                                    });
                                                }
                                            break;
                                            case 0:
                                                if (tthis.filterInt(now - date(list[idx3].lastModified)) >= 43200000) {
                                                    f3(++idx3);
                                                }else if (tthis.filterInt(now) >= date(list[idx3].recoveryDate)) {
                                                    f3(++idx3);
                                                }else if (tthis.filterInt(now) < date(list[idx3].recoveryDate) && tthis.filterInt(now) >= date(list[idx3].startDate)) {
                                                    (function f4 (idx4){
                                                        if (idx4 < list[idx3].phase.length){
                                                            var id = list[idx3].id + "_" + list[idx3].phase[idx4].id;
                                                            var obj = new tthis.phaseObj(
                                                                id,
                                                                list[idx3].id,
                                                                list[idx3].phase[idx4].id,
                                                                list[idx3].gateway,
                                                                list[idx3].network,
                                                                list[idx3].phase[idx4].rampUpDate,
                                                                list[idx3].phase[idx4].eventStart,
                                                                list[idx3].recoveryDate,
                                                                list[idx3].endDate,
                                                                list[idx3].phase[idx4].rampUp,
                                                                list[idx3].phase[idx4].duration,
                                                                list[idx3].recovery,
                                                                list[idx3].phase[idx4].action,
                                                                list[idx3].phase[idx4].commandValue
                                                            );
                                        
                                                            if (tthis.filterInt(now) < date(obj.eventStart)){
                                                                if (tthis.filterInt(now) >= date(obj.rampUpDate)) {
                                                                    obj.startDate = moment.utc().add(60, 'seconds').format("YYYY-MM-DD HH:mm:ss");
                                                                    if (date(obj.eventStart) - (tthis.filterInt(now)) >= (obj.rampUp*1000)) {
                                                                        Service.createCron(obj, "event", "rampUp", function(error, cron){
                                                                            if (error) {
                                                                                console.error(error)
                                                                            }else{
                                                                                Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                                Service.createCron(obj, "event", "start", function(error2, cron2){
                                                                                    if (error2) {
                                                                                        console.error(error2)
                                                                                    }else{
                                                                                        Service.startCron(cron2.uniqueId, cron2.cronJobObj);	
                                                                                    }
                                                                                    f4(++idx4);
                                                                                });
                                                                            }	
                                                                        });
                                                                    }else{
                                                                        Service.createCron(obj, "event", "rampUp", function(error, cron){
                                                                            if (error) {
                                                                                console.error(error)
                                                                            }else{
                                                                                Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                                f4(++idx4);
                                                                            }	
                                                                        });
                                                                    }
                                                                }else{
                                                                    if (date(obj.eventStart) - (tthis.filterInt(now)) >= (obj.rampUp*1000)) {
                                                                        Service.createCron(obj, "event", "rampUp", function(error, cron){
                                                                            if (error) {
                                                                                console.error(error)
                                                                            }else{
                                                                                Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                                Service.createCron(obj, "event", "start", function(error2, cron2){
                                                                                    if (error2) {
                                                                                        console.error(error2)
                                                                                    }else{
                                                                                        Service.startCron(cron2.uniqueId, cron2.cronJobObj);	
                                                                                    }
                                                                                    f4(++idx4);
                                                                                });
                                                                            }	
                                                                        });
                                                                    }else{
                                                                        Service.createCron(obj, "event", "rampUp", function(error, cron){
                                                                            if (error) {
                                                                                console.error(error)
                                                                            }else{
                                                                                Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                                f4(++idx4);
                                                                            }	
                                                                        });
                                                                    }
                                                                }
                                                            }else{
                                                                if ((date(obj.endDate)-tthis.filterInt(now)) >= tthis.filterInt(config.pool.maxTime)) {
                                                                    Service.createCron(obj, "event", "rampUp", function(error, cron){
                                                                        if (error) {
                                                                            console.error(error)
                                                                        }else{
                                                                            Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                            f4(++idx4);
                                                                        }	
                                                                    });
                                                                }else{
                                                                    f4(++idx4);
                                                                }
                                                            }
                                                        }else{
                                                            Service.createCron(list[idx3], "event", "recovery", function(error, cron){
                                                                if (error) {
                                                                    console.error(error)
                                                                }else{
                                                                    Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                    Service.createCron(list[idx3], "event", "end", function(error2, cron2){
                                                                        if (error2) {
                                                                            console.error(error2)
                                                                        }else{
                                                                            Service.startCron(cron2.uniqueId, cron2.cronJobObj);	
                                                                        }
                                                                        f3(++idx3);
                                                                    });
                                                                }	
                                                            });
                                                        }
                                                    })(0);	
                                                }else if (tthis.filterInt(now) < date(list[idx3].startDate)){
                                                    (function f4 (idx4){
                                                        if (idx4 < list[idx3].phase.length){
                                                            var id = list[idx3].id + "_" + list[idx3].phase[idx4].id;
                                                            var obj = new tthis.phaseObj(
                                                                id,
                                                                list[idx3].id,
                                                                list[idx3].phase[idx4].id,
                                                                list[idx3].gateway,
                                                                list[idx3].network,
                                                                list[idx3].phase[idx4].rampUpDate,
                                                                list[idx3].phase[idx4].eventStart,
                                                                list[idx3].recoveryDate,
                                                                list[idx3].endDate,
                                                                list[idx3].phase[idx4].rampUp,
                                                                list[idx3].phase[idx4].duration,
                                                                list[idx3].recovery,
                                                                list[idx3].phase[idx4].action,
                                                                list[idx3].phase[idx4].commandValue
                                                            );
                                                            
                                                            Service.createCron(obj, "event", "rampUp", function(error, cron){
                                                                if (error) {
                                                                    console.error(error)
                                                                }else{
                                                                    Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                    Service.createCron(obj, "event", "start", function(error2, cron2){
                                                                        if (error2) {
                                                                            console.error(error2)
                                                                        }else{
                                                                            Service.startCron(cron2.uniqueId, cron2.cronJobObj);	
                                                                        }
                                                                        f4(++idx4);
                                                                    });
                                                                }	
                                                            });
                                                        }else{
                                                            Service.createCron(list[idx3], "event", "recovery", function(error, cron){
                                                                if (error) {
                                                                    console.error(error)
                                                                }else{
                                                                    Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                    Service.createCron(list[idx3], "event", "end", function(error2, cron2){
                                                                        if (error2) {
                                                                            console.error(error2)
                                                                        }else{
                                                                            Service.startCron(cron2.uniqueId, cron2.cronJobObj);	
                                                                        }
                                                                        f3(++idx3);
                                                                    });
                                                                }	
                                                            });
                                                        }
                                                    })(0);	
                                                }
                                            break;
                                            case 1:                                                   
                                                if (tthis.filterInt(now - date(list[idx3].lastModified)) >= 43200000) {
                                                    f3(++idx3);
                                                }else if (tthis.filterInt(now) >= date(list[idx3].recoveryDate)) {
                                                    f3(++idx3);
                                                }else if (tthis.filterInt(now) < date(list[idx3].recoveryDate) && tthis.filterInt(now) >= date(list[idx3].startDate)) {
                                                    (function f4 (idx4){
                                                        if (idx4 < list[idx3].phase.length){
                                                            var id = list[idx3].id + "_" + list[idx3].phase[idx4].id;
                                                            var obj = new tthis.phaseObj(
                                                                id,
                                                                list[idx3].id,
                                                                list[idx3].phase[idx4].id,
                                                                list[idx3].gateway,
                                                                list[idx3].network,
                                                                list[idx3].phase[idx4].rampUpDate,
                                                                list[idx3].phase[idx4].eventStart,
                                                                list[idx3].recoveryDate,
                                                                list[idx3].endDate,
                                                                list[idx3].phase[idx4].rampUp,
                                                                list[idx3].phase[idx4].duration,
                                                                list[idx3].recovery,
                                                                list[idx3].phase[idx4].action,
                                                                list[idx3].phase[idx4].commandValue
                                                            );
                                        
                                                             if (tthis.filterInt(now) < date(obj.eventStart)){
                                                                if (tthis.filterInt(now) >= date(obj.rampUpDate)) {
                                                                    obj.startDate = moment.utc().add(60, 'seconds').format("YYYY-MM-DD HH:mm:ss");
                                                                    if (date(obj.eventStart) - (tthis.filterInt(now)) >= (obj.rampUp*1000)) {
                                                                        Service.createCron(obj, "event", "rampUp", function(error, cron){
                                                                            if (error) {
                                                                                console.error(error)
                                                                            }else{
                                                                                Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                                Service.createCron(obj, "event", "start", function(error2, cron2){
                                                                                    if (error2) {
                                                                                        console.error(error2)
                                                                                    }else{
                                                                                        Service.startCron(cron2.uniqueId, cron2.cronJobObj);	
                                                                                    }
                                                                                    f4(++idx4);
                                                                                });
                                                                            }	
                                                                        });
                                                                    }else{
                                                                        Service.createCron(obj, "event", "rampUp", function(error, cron){
                                                                            if (error) {
                                                                                console.error(error)
                                                                            }else{
                                                                                Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                                f4(++idx4);
                                                                            }	
                                                                        });
                                                                    }
                                                                }else{
                                                                    if (date(obj.eventStart) - (tthis.filterInt(now)) >= (obj.rampUp*1000)) {
                                                                        Service.createCron(obj, "event", "rampUp", function(error, cron){
                                                                            if (error) {
                                                                                console.error(error)
                                                                            }else{
                                                                                Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                                Service.createCron(obj, "event", "start", function(error2, cron2){
                                                                                    if (error2) {
                                                                                        console.error(error2)
                                                                                    }else{
                                                                                        Service.startCron(cron2.uniqueId, cron2.cronJobObj);	
                                                                                    }
                                                                                    f4(++idx4);
                                                                                });
                                                                            }	
                                                                        });
                                                                    }else{
                                                                        Service.createCron(obj, "event", "rampUp", function(error, cron){
                                                                            if (error) {
                                                                                console.error(error)
                                                                            }else{
                                                                                Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                                f4(++idx4);
                                                                            }	
                                                                        });
                                                                    }
                                                                }
                                                            }else{
                                                                if ((date(obj.phaseEnd)-tthis.filterInt(now)) >= tthis.filterInt(config.pool.maxTime)) {
                                                                    console.warn(config.pool.maxTime);
                                                                    Service.createCron(obj, "event", "rampUp", function(error, cron){
                                                                        if (error) {
                                                                            console.error(error)
                                                                        }else{
                                                                            Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                            f4(++idx4);
                                                                        }	
                                                                    });
                                                                }else{
                                                                    f4(++idx4);
                                                                }
                                                            }
                                                        }else{
                                                            Service.createCron(list[idx3], "event", "recovery", function(error, cron){
                                                                if (error) {
                                                                    console.error(error)
                                                                }else{
                                                                    Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                    Service.createCron(list[idx3], "event", "end", function(error2, cron2){
                                                                        if (error2) {
                                                                            console.error(error2)
                                                                        }else{
                                                                            Service.startCron(cron2.uniqueId, cron2.cronJobObj);	
                                                                        }
                                                                        f3(++idx3);
                                                                    });
                                                                }	
                                                            });
                                                        }
                                                    })(0);	
                                                }else if (tthis.filterInt(now) < date(list[idx3].startDate)){
                                                    (function f4 (idx4){
                                                        if (idx4 < list[idx3].phase.length){
                                                            var id = list[idx3].id + "_" + list[idx3].phase[idx4].id;
                                                            var obj = new tthis.phaseObj(
                                                                id,
                                                                list[idx3].id,
                                                                list[idx3].phase[idx4].id,
                                                                list[idx3].gateway,
                                                                list[idx3].network,
                                                                list[idx3].phase[idx4].rampUpDate,
                                                                list[idx3].phase[idx4].eventStart,
                                                                list[idx3].recoveryDate,
                                                                list[idx3].endDate,
                                                                list[idx3].phase[idx4].rampUp,
                                                                list[idx3].phase[idx4].duration,
                                                                list[idx3].recovery,
                                                                list[idx3].phase[idx4].action,
                                                                list[idx3].phase[idx4].commandValue
                                                            );
                                                            
                                                            Service.createCron(obj, "event", "rampUp", function(error, cron){
                                                                if (error) {
                                                                    console.error(error)
                                                                }else{
                                                                    Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                    Service.createCron(obj, "event", "start", function(error2, cron2){
                                                                        if (error2) {
                                                                            console.error(error2)
                                                                        }else{
                                                                            Service.startCron(cron2.uniqueId, cron2.cronJobObj);	
                                                                        }
                                                                        f4(++idx4);
                                                                    });
                                                                }	
                                                            });
                                                        }else{
                                                            Service.createCron(list[idx3], "event", "recovery", function(error, cron){
                                                                if (error) {
                                                                    console.error(error)
                                                                }else{
                                                                    Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                    Service.createCron(list[idx3], "event", "end", function(error2, cron2){
                                                                        if (error2) {
                                                                            console.error(error2)
                                                                        }else{
                                                                            Service.startCron(cron2.uniqueId, cron2.cronJobObj);	
                                                                        }
                                                                        f3(++idx3);
                                                                    });
                                                                }	
                                                            });
                                                        }
                                                    })(0);	
                                                }	
                                            break;
                                            case 2:
                                                if (tthis.filterInt(now - date(list[idx3].startDate)) >= 43200000) {
                                                    Service.setDeviceTarget(0, null, list[idx3].id, function(err, result){
                                                        if (err){
                                                            console.error(err);  
                                                        }else{
                                                            console.success(result);
                                                        }
                                                        f3(++idx3);
                                                    });
                                                }else if (tthis.filterInt(now) >= date(list[idx3].recoveryDate)) {
                                                    Service.createCron(list[idx3], "event", "cancel", function (error, cron){
                                                        if (error) {
                                                            console.error(error);
                                                        }else{
                                                            Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                            Service.createCron(list[idx3], "event", "cancelled", function(error2, cron2){
                                                                if (error2) {
                                                                    console.error(error2);
                                                                }else{
                                                                    Service.startCron(cron2.uniqueId, cron2.cronJobObj);
                                                                }	
                                                                f3(++idx3);
                                                            });
                                                        }
                                                    });
                                                }else if (tthis.filterInt(now) < date(list[idx3].recoveryDate) && tthis.filterInt(now) >= date(list[idx3].startDate)) {
                                                    (function f4 (idx4){
                                                        if (idx4 < list[idx3].phase.length){
                                                            var id = list[idx3].id + "_" + list[idx3].phase[idx4].id;
                                                            var obj = new tthis.phaseObj(
                                                                id,
                                                                list[idx3].id,
                                                                list[idx3].phase[idx4].id,
                                                                list[idx3].gateway,
                                                                list[idx3].network,
                                                                list[idx3].phase[idx4].rampUpDate,
                                                                list[idx3].phase[idx4].eventStart,
                                                                list[idx3].recoveryDate,
                                                                list[idx3].endDate,
                                                                list[idx3].phase[idx4].rampUp,
                                                                list[idx3].phase[idx4].duration,
                                                                list[idx3].recovery,
                                                                list[idx3].phase[idx4].action,
                                                                list[idx3].phase[idx4].commandValue
                                                            );
                                        
                                                             if (tthis.filterInt(now) < date(obj.eventStart)){
                                                                if (tthis.filterInt(now) >= date(obj.rampUpDate)) {
                                                                    obj.startDate = moment.utc().add(60, 'seconds').format("YYYY-MM-DD HH:mm:ss");
                                                                    if (date(obj.eventStart) - (tthis.filterInt(now)) >= (obj.rampUp*1000)) {
                                                                        Service.createCron(obj, "event", "rampUp", function(error, cron){
                                                                            if (error) {
                                                                                console.error(error)
                                                                            }else{
                                                                                Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                                Service.createCron(obj, "event", "start", function(error2, cron2){
                                                                                    if (error2) {
                                                                                        console.error(error2)
                                                                                    }else{
                                                                                        Service.startCron(cron2.uniqueId, cron2.cronJobObj);	
                                                                                    }
                                                                                    f4(++idx4);
                                                                                });
                                                                            }	
                                                                        });
                                                                    }else{
                                                                        Service.createCron(obj, "event", "rampUp", function(error, cron){
                                                                            if (error) {
                                                                                console.error(error)
                                                                            }else{
                                                                                Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                                f4(++idx4);
                                                                            }	
                                                                        });
                                                                    }
                                                                }else{
                                                                    if (date(obj.eventStart) - (tthis.filterInt(now)) >= (obj.rampUp*1000)) {
                                                                        Service.createCron(obj, "event", "rampUp", function(error, cron){
                                                                            if (error) {
                                                                                console.error(error)
                                                                            }else{
                                                                                Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                                Service.createCron(obj, "event", "start", function(error2, cron2){
                                                                                    if (error2) {
                                                                                        console.error(error2)
                                                                                    }else{
                                                                                        Service.startCron(cron2.uniqueId, cron2.cronJobObj);	
                                                                                    }
                                                                                    f4(++idx4);
                                                                                });
                                                                            }	
                                                                        });
                                                                    }else{
                                                                        Service.createCron(obj, "event", "rampUp", function(error, cron){
                                                                            if (error) {
                                                                                console.error(error)
                                                                            }else{
                                                                                Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                                f4(++idx4);
                                                                            }	
                                                                        });
                                                                    }
                                                                }
                                                            }else{
                                                                if ((date(obj.phaseEnd)-tthis.filterInt(now)) >= tthis.filterInt(config.pool.maxTime)) {
                                                                    console.warn(config.pool.maxTime);
                                                                    Service.createCron(obj, "event", "rampUp", function(error, cron){
                                                                        if (error) {
                                                                            console.error(error)
                                                                        }else{
                                                                            Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                            f4(++idx4);
                                                                        }	
                                                                    });
                                                                }else{
                                                                    f4(++idx4);
                                                                }
                                                            }
                                                        }else{
                                                            Service.createCron(list[idx3], "event", "recovery", function(error, cron){
                                                                if (error) {
                                                                    console.error(error)
                                                                }else{
                                                                    Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                    Service.createCron(list[idx3], "event", "end", function(error2, cron2){
                                                                        if (error2) {
                                                                            console.error(error2)
                                                                        }else{
                                                                            Service.startCron(cron2.uniqueId, cron2.cronJobObj);	
                                                                        }
                                                                        f3(++idx3);
                                                                    });
                                                                }	
                                                            });
                                                        }
                                                    })(0);	
                                                }else if (tthis.filterInt(now) < date(list[idx3].startDate)){
                                                    (function f4 (idx4){
                                                        if (idx4 < list[idx3].phase.length){
                                                            var id = list[idx3].id + "_" + list[idx3].phase[idx4].id;
                                                            var obj = new tthis.phaseObj(
                                                                id,
                                                                list[idx3].id,
                                                                list[idx3].phase[idx4].id,
                                                                list[idx3].gateway,
                                                                list[idx3].network,
                                                                list[idx3].phase[idx4].rampUpDate,
                                                                list[idx3].phase[idx4].eventStart,
                                                                list[idx3].recoveryDate,
                                                                list[idx3].endDate,
                                                                list[idx3].phase[idx4].rampUp,
                                                                list[idx3].phase[idx4].duration,
                                                                list[idx3].recovery,
                                                                list[idx3].phase[idx4].action,
                                                                list[idx3].phase[idx4].commandValue
                                                            );
                                                            
                                                            Service.createCron(obj, "event", "rampUp", function(error, cron){
                                                                if (error) {
                                                                    console.error(error)
                                                                }else{
                                                                    Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                    Service.createCron(obj, "event", "start", function(error2, cron2){
                                                                        if (error2) {
                                                                            console.error(error2)
                                                                        }else{
                                                                            Service.startCron(cron2.uniqueId, cron2.cronJobObj);	
                                                                        }
                                                                        f4(++idx4);
                                                                    });
                                                                }	
                                                            });
                                                        }else{
                                                            Service.createCron(list[idx3], "event", "recovery", function(error, cron){
                                                                if (error) {
                                                                    console.error(error)
                                                                }else{
                                                                    Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                    Service.createCron(list[idx3], "event", "end", function(error2, cron2){
                                                                        if (error2) {
                                                                            console.error(error2)
                                                                        }else{
                                                                            Service.startCron(cron2.uniqueId, cron2.cronJobObj);	
                                                                        }
                                                                        f3(++idx3);
                                                                    });
                                                                }	
                                                            });
                                                        }
                                                    })(0);	
                                                }
                                            break;
                                            case 3:
                                                if (tthis.filterInt(now - date(list[idx3].startDate)) >= 43200000) {
                                                    Service.setDeviceTarget(0, null, list[idx3].id, function(err, result){
                                                        if (err){
                                                            console.error(err);  
                                                        }else{
                                                            console.success(result);
                                                        }
                                                        f3(++idx3);
                                                    });
                                                }else if (tthis.filterInt(now) >= date(list[idx3].recoveryDate)) {
                                                    Service.createCron(list[idx3], "event", "cancel", function (error, cron){
                                                        if (error) {
                                                            console.error(error);
                                                        }else{
                                                            Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                            Service.createCron(list[idx3], "event", "cancelled", function(error2, cron2){
                                                                if (error2) {
                                                                    console.error(error2);
                                                                }else{
                                                                    Service.startCron(cron2.uniqueId, cron2.cronJobObj);
                                                                }	
                                                                f3(++idx3);
                                                            });
                                                        }
                                                    });
                                                }else if (tthis.filterInt(now) < date(list[idx3].recoveryDate) && tthis.filterInt(now) >= date(list[idx3].startDate)) {
                                                    (function f4 (idx4){
                                                        if (idx4 < list[idx3].phase.length){
                                                            var id = list[idx3].id + "_" + list[idx3].phase[idx4].id;
                                                            var obj = new tthis.phaseObj(
                                                                id,
                                                                list[idx3].id,
                                                                list[idx3].phase[idx4].id,
                                                                list[idx3].gateway,
                                                                list[idx3].network,
                                                                list[idx3].phase[idx4].rampUpDate,
                                                                list[idx3].phase[idx4].eventStart,
                                                                list[idx3].recoveryDate,
                                                                list[idx3].endDate,
                                                                list[idx3].phase[idx4].rampUp,
                                                                list[idx3].phase[idx4].duration,
                                                                list[idx3].recovery,
                                                                list[idx3].phase[idx4].action,
                                                                list[idx3].phase[idx4].commandValue
                                                            );
                                        
                                                             if (tthis.filterInt(now) < date(obj.eventStart)){
                                                                if (tthis.filterInt(now) >= date(obj.rampUpDate)) {
                                                                    obj.startDate = moment.utc().add(60, 'seconds').format("YYYY-MM-DD HH:mm:ss");
                                                                    if (date(obj.eventStart) - (tthis.filterInt(now)) >= (obj.rampUp*1000)) {
                                                                        Service.createCron(obj, "event", "rampUp", function(error, cron){
                                                                            if (error) {
                                                                                console.error(error)
                                                                            }else{
                                                                                Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                                Service.createCron(obj, "event", "start", function(error2, cron2){
                                                                                    if (error2) {
                                                                                        console.error(error2)
                                                                                    }else{
                                                                                        Service.startCron(cron2.uniqueId, cron2.cronJobObj);	
                                                                                    }
                                                                                    f4(++idx4);
                                                                                });
                                                                            }	
                                                                        });
                                                                    }else{
                                                                        Service.createCron(obj, "event", "rampUp", function(error, cron){
                                                                            if (error) {
                                                                                console.error(error)
                                                                            }else{
                                                                                Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                                f4(++idx4);
                                                                            }	
                                                                        });
                                                                    }
                                                                }else{
                                                                    if (date(obj.eventStart) - (tthis.filterInt(now)) >= (obj.rampUp*1000)) {
                                                                        Service.createCron(obj, "event", "rampUp", function(error, cron){
                                                                            if (error) {
                                                                                console.error(error)
                                                                            }else{
                                                                                Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                                Service.createCron(obj, "event", "start", function(error2, cron2){
                                                                                    if (error2) {
                                                                                        console.error(error2)
                                                                                    }else{
                                                                                        Service.startCron(cron2.uniqueId, cron2.cronJobObj);	
                                                                                    }
                                                                                    f4(++idx4);
                                                                                });
                                                                            }	
                                                                        });
                                                                    }else{
                                                                        Service.createCron(obj, "event", "rampUp", function(error, cron){
                                                                            if (error) {
                                                                                console.error(error)
                                                                            }else{
                                                                                Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                                f4(++idx4);
                                                                            }	
                                                                        });
                                                                    }
                                                                }
                                                            }else{
                                                                if ((date(obj.phaseEnd)-tthis.filterInt(now)) >= tthis.filterInt(config.pool.maxTime)) {
                                                                    console.warn(config.pool.maxTime);
                                                                    Service.createCron(obj, "event", "rampUp", function(error, cron){
                                                                        if (error) {
                                                                            console.error(error)
                                                                        }else{
                                                                            Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                            f4(++idx4);
                                                                        }	
                                                                    });
                                                                }else{
                                                                    f4(++idx4);
                                                                }
                                                            }
                                                        }else{
                                                            Service.createCron(list[idx3], "event", "recovery", function(error, cron){
                                                                if (error) {
                                                                    console.error(error)
                                                                }else{
                                                                    Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                    Service.createCron(list[idx3], "event", "end", function(error2, cron2){
                                                                        if (error2) {
                                                                            console.error(error2)
                                                                        }else{
                                                                            Service.startCron(cron2.uniqueId, cron2.cronJobObj);	
                                                                        }
                                                                        f3(++idx3);
                                                                    });
                                                                }	
                                                            });
                                                        }
                                                    })(0);	
                                                }else if (tthis.filterInt(now) < date(list[idx3].startDate)){
                                                    (function f4 (idx4){
                                                        if (idx4 < list[idx3].phase.length){
                                                            var id = list[idx3].id + "_" + list[idx3].phase[idx4].id;
                                                            var obj = new tthis.phaseObj(
                                                                id,
                                                                list[idx3].id,
                                                                list[idx3].phase[idx4].id,
                                                                list[idx3].gateway,
                                                                list[idx3].network,
                                                                list[idx3].phase[idx4].rampUpDate,
                                                                list[idx3].phase[idx4].eventStart,
                                                                list[idx3].recoveryDate,
                                                                list[idx3].endDate,
                                                                list[idx3].phase[idx4].rampUp,
                                                                list[idx3].phase[idx4].duration,
                                                                list[idx3].recovery,
                                                                list[idx3].phase[idx4].action,
                                                                list[idx3].phase[idx4].commandValue
                                                            );
                                                            
                                                            Service.createCron(obj, "event", "rampUp", function(error, cron){
                                                                if (error) {
                                                                    console.error(error)
                                                                }else{
                                                                    Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                    Service.createCron(obj, "event", "start", function(error2, cron2){
                                                                        if (error2) {
                                                                            console.error(error2)
                                                                        }else{
                                                                            Service.startCron(cron2.uniqueId, cron2.cronJobObj);	
                                                                        }
                                                                        f4(++idx4);
                                                                    });
                                                                }	
                                                            });
                                                        }else{
                                                            Service.createCron(list[idx3], "event", "recovery", function(error, cron){
                                                                if (error) {
                                                                    console.error(error)
                                                                }else{
                                                                    Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                    Service.createCron(list[idx3], "event", "end", function(error2, cron2){
                                                                        if (error2) {
                                                                            console.error(error2)
                                                                        }else{
                                                                            Service.startCron(cron2.uniqueId, cron2.cronJobObj);	
                                                                        }
                                                                        f3(++idx3);
                                                                    });
                                                                }	
                                                            });
                                                        }
                                                    })(0);	
                                                }
                                            break;
                                            case 4:
                                                if (tthis.filterInt(now - date(list[idx3].lastModified)) >= 43200000) {
                                                    Service.setDeviceTarget(0, null, list[idx3].id, function(err, result){
                                                        if (err){
                                                            console.error(err);  
                                                        }else{
                                                            console.success(result);
                                                        }
                                                        f3(++idx3);
                                                    });
                                                }else if (tthis.filterInt(now) >= date(list[idx3].recoveryDate)) {
                                                    if (tthis.filterInt(now) < date(list[idx3].endDate)) {
                                                        list[idx3].recoveryDate = moment.utc().add(60, 'seconds').format("YYYY-MM-DD HH:mm:ss");
                                                        Service.createCron(list[idx3], "event", "recovery", function(error, cron){
                                                            if (error) {
                                                                console.error(error)
                                                            }else{
                                                                Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                Service.createCron(list[idx3], "event", "end", function(error2, cron2){
                                                                    if (error2) {
                                                                        console.error(error2)
                                                                    }else{
                                                                        Service.startCron(cron2.uniqueId, cron2.cronJobObj);	
                                                                    }
                                                                    f3(++idx3);
                                                                });
                                                            }	
                                                        });
                                                    }else{
                                                        Service.createCron(list[idx3], "event", "cancel", function (error, cron){
                                                            if (error) {
                                                                console.error(error);
                                                            }else{
                                                                Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                                Service.createCron(list[idx3], "event", "cancelled", function(error2, cron2){
                                                                    if (error2) {
                                                                        console.error(error2);
                                                                    }else{
                                                                        Service.startCron(cron2.uniqueId, cron2.cronJobObj);
                                                                    }	
                                                                    f3(++idx3);
                                                                });
                                                            }
                                                        });
                                                    }
                                                }else if (tthis.filterInt(now) < date(list[idx3].recoveryDate) && now >= date(list[idx3].startDate)) {
                                                    Service.createCron(list[idx3], "event", "recovery", function(error, cron){
                                                        if (error) {
                                                            console.error(error)
                                                        }else{
                                                            Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                            Service.createCron(list[idx3], "event", "end", function(error2, cron2){
                                                                if (error2) {
                                                                    console.error(error2)
                                                                }else{
                                                                    Service.startCron(cron2.uniqueId, cron2.cronJobObj);	
                                                                }
                                                                f3(++idx3);
                                                            });
                                                        }	
                                                    });
                                                }else if (tthis.filterInt(now) < date(list[idx3].startDate)){
                                                    Service.createCron(list[idx3], "event", "recovery", function(error, cron){
                                                        if (error) {
                                                            console.error(error)
                                                        }else{
                                                            Service.startCron(cron.uniqueId, cron.cronJobObj);
                                                            Service.createCron(list[idx3], "event", "end", function(error2, cron2){
                                                                if (error2) {
                                                                    console.error(error2)
                                                                }else{
                                                                    Service.startCron(cron2.uniqueId, cron2.cronJobObj);	
                                                                }
                                                                f3(++idx3);
                                                            });
                                                        }	
                                                    });
                                                }	
                                            break;
                                            default:
                                                f3(++idx3);
                                        }
                                    }else{
                                        cb(null, "All Cron Event Restart");
                                    }
                                })(0);
                            } 
                        }    
                    })(0);
                }
            });