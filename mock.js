





// get需要传递的参数 2019-1220
const param = {
  "query": "上海女人",
  "pageNo": 1,
  "pageSize": 10,
  "secondQuerySubjects": [
    {
      "secondQueryDetails": [
        {
          "recommendResult": [
            {
              "columnCode": "b_prov",
              "columnValue": "北京"
            }
          ]
        },
        {
          "recommendResult": [
            {
              "columnCode": "xm",
              "columnValue": "张三"
            }
          ]
        }
      ]
    },
    {
      "secondQueryDetails": [
        {
          "recommendResult": [
            {
              "columnCode": "xm",
              "columnValue": "张三"
            }
          ]
        }
      ]
    }
  ]
}


// 语义分析返回的参数 2019-1220
const mock1220 = {
  "errCode": 200,
  "errMsg": "",
  "success": true,
  "data": {
    "status": "SUCCESS",
    "result": {
      "personAnalysisResult": {
        "resList": [
          {
            "subject": "关系信息", //分段主题
            "type": "attr", //分段类型
            "unprcSecs": [], //未解析
            "subSql": "Select distinct a.gmsfhm1_fql as userId  From dm_relation_tonghuoche a  join dm_entity_person b on a.gmsfhm2_fql = b.gmsfhm_fql and (a.e_prov =\"110000\")  and b.xm= ",
            "prcSecs": ["女性"],
            "rawQuery": "女性", // 对应原始query的分词结果
            "analysisDetail": [
              {
                "analysisTableName": "同乘火车",
                "analysisTableDetail": {
                  "b_time": {
                    "columnName": "开始时间", //字段对应描述
                    "columnValue": "test", // 解析有返回则填充，如果该字段有值，就在一解析部分显示，如果没有值，则在智能推荐下方显示
                    "columnType": "date",
                    "columnDefaultScope": [

                    ]
                  },
                  "csrq": {
                    "columnName": "出生日期",
                    "columnValue": "",
                    "columnType": "date",
                    "columnDefaultScope": []
                  },
                  "hjd_prov": {
                    "columnName": "户籍地",
                    "columnValue": "",
                    "columnType": "input",
                    "columnDefaultScope": []
                  },
                  "gmsfhm": {
                    "columnName": "身份证号",
                    "columnValue": "",
                    "columnType": "input",
                    "columnDefaultScope": []
                  },
                  "xb": {
                    "columnName": "性别",
                    "columnValue": "女性",
                    "columnType": "select",
                    "columnDefaultScope": [
                      "男",
                      "女"
                    ]
                  },
                  "mz": {
                    "columnName": "民族",
                    "columnValue": "",
                    "columnType": "select",
                    "columnDefaultScope": [
                      "汉",
                      "满",
                      "土"
                    ]
                  },
                  "jgd_prov": {
                    "columnName": "籍贯地",
                    "columnValue": "",
                    "columnType": "input",
                    "columnDefaultScope": []
                  },
                  "sfxdry": {
                    "columnName": "是否吸毒",
                    "columnValue": "",
                    "columnType": "select",
                    "columnDefaultScope": [
                      "是",
                      "否"
                    ]
                  },
                  "xm": {
                    "columnName": "姓名",
                    "columnValue": "",
                    "columnType": "input",
                    "columnDefaultScope": []
                  },
                  "sfzdry": {
                    "columnName": "是否重点",
                    "columnValue": "",
                    "columnType": "select",
                    "columnDefaultScope": [
                      "是",
                      "否"
                    ]
                  },
                  "bdsfsd": {
                    "columnName": "是否涉毒",
                    "columnValue": "",
                    "columnType": "select",
                    "columnDefaultScope": [
                      "是",
                      "否"
                    ]
                  },
                  "sfqkry": {
                    "columnName": "是否前科",
                    "columnValue": "",
                    "columnType": "select",
                    "columnDefaultScope": [
                      "是",
                      "否"
                    ]
                  },
                  "jzd_prov": {
                    "columnName": "居住地",
                    "columnValue": "",
                    "columnType": "input",
                    "columnDefaultScope": []
                  },
                },
              },
              {
                "analysisTableName": "关系人属性",
                "analysisTableDetail": {
                  "csrq": {
                    "columnName": "出生日期",
                    "columnValue": "",
                    "columnType": "date",
                    "columnDefaultScope": [
                    ]
                  },
                  "hjd_prov": {
                    "columnName": "户籍地",
                    "columnValue": "",
                    "columnType": "input",
                    "columnDefaultScope": [
                    ]
                  },
                  "xb": {
                    "columnName": "性别",
                    "columnValue": "",
                    "columnType": "select",
                    "columnDefaultScope": [
                      "男",
                      "女"
                    ]
                  },
                  "mz": {
                    "columnName": "民族",
                    "columnValue": "",
                    "columnType": "select",
                    "columnDefaultScope": [
                      "汉",
                      "满",
                      "土"
                    ]
                  },
                  "jgd_prov": {
                    "columnName": "籍贯地",
                    "columnValue": "",
                    "columnType": "input",
                    "columnDefaultScope": []
                  },
                  "sfxdry": {
                    "columnName": "是否吸毒",
                    "columnValue": "",
                    "columnType": "select",
                    "columnDefaultScope": [
                      "是",
                      "否"
                    ]
                  },
                  "xm": {
                    "columnName": "姓名",
                    "columnValue": "",
                    "columnType": "input",
                    "columnDefaultScope": []
                  },
                  "sfzdry": {
                    "columnName": "是否重点",
                    "columnValue": "",
                    "columnType": "select",
                    "columnDefaultScope": [
                      "是",
                      "否"
                    ]
                  },
                  "bdsfsd": {
                    "columnName": "是否涉毒",
                    "columnValue": "",
                    "columnType": "select",
                    "columnDefaultScope": [
                      "是",
                      "否"
                    ]
                  },
                  "sfqkry": {
                    "columnName": "是否前科",
                    "columnValue": "",
                    "columnType": "select",
                    "columnDefaultScope": [
                      "是",
                      "否"
                    ]
                  },
                  "jzd_prov": {
                    "columnName": "居住地",
                    "columnValue": "",
                    "columnType": "input",
                    "columnDefaultScope": []
                  },
                }
              }
            ],
            "count": "1001"
          }
        ],
        "synonym": [],
        "punctuationInfo": "女性" //分段信息
      },
      "carAnalysisResult": {
        "resList": [],
        "synonym": [],
        "punctuationInfo": null
      },
      "caseAnalysisResult": {
        "resList": [],
        "synonym": [],
        "punctuationInfo": null
      }
    },
    "objectId": null
  },
  "dataCode": "1000"
}

// 1. 如何判断是已解析还是智能推荐
// 判断列表中的columnValue的值，如果有值就是已解析，如果没值就是属于智能推荐里的字段