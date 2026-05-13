import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area, BarChart, Bar } from 'recharts';
import {
  User, MapPin, Phone, Mail, GraduationCap, Building2, Briefcase, TrendingUp,
  Award, AlertCircle, Target, Users, Calendar, DollarSign, Heart, Shield,
  Zap, Star, Clock, CheckCircle, FileText, Settings
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('基础信息');

  // 核心能力雷达图数据
  const abilityRadarData = [
    { subject: '专业技能', value: 92 },
    { subject: '通用能力', value: 88 },
    { subject: '管理能力', value: 85 },
    { subject: '工具系统', value: 90 },
    { subject: '学习能力', value: 86 },
  ];

  // 薪资变化趋势数据
  const salaryTrendData = [
    { year: '2020', salary: 12 },
    { year: '2021', salary: 15 },
    { year: '2022', salary: 18 },
    { year: '2023', salary: 22 },
    { year: '2024', salary: 26 },
    { year: '2025', salary: 30 },
  ];

  // 求职活跃度数据
  const jobActivityData = [
    { month: '1月', count: 5 },
    { month: '2月', count: 8 },
    { month: '3月', count: 12 },
    { month: '4月', count: 10 },
    { month: '5月', count: 15 },
    { month: '6月', count: 18 },
  ];

  const tabs = [
    { name: '基础信息', icon: User },
    { name: '教育背景', icon: GraduationCap },
    { name: '职业经历', icon: Briefcase },
    { name: '核心能力', icon: Zap },
    { name: '就业状态', icon: Target },
    { name: '薪资评估', icon: DollarSign },
    { name: '意向匹配', icon: Heart },
    { name: '风险评估', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e1a] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-purple-950/20 to-slate-950/30"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(99, 102, 241, 0.1) 1px, transparent 0)`,
        backgroundSize: '48px 48px'
      }}></div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-xl bg-slate-900/60 border-b border-indigo-500/20">
        <div className="px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur-lg opacity-75"></div>
                <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                  <Users className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1 tracking-widest">UNIFIED TALENT PROFILE SYSTEM</div>
                <div className="text-2xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                  统一人才画像体系
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Calendar className="w-4 h-4" />
                <span>2026年5月12日 14:32</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400">系统正常</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Profile Card */}
          <div className="col-span-3 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-2xl blur-xl"></div>
              <div className="relative backdrop-blur-xl bg-slate-900/70 border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
                {/* Photo */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl blur-md opacity-50"></div>
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden border-2 border-slate-700/50">
                    <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                      <User className="w-24 h-24 text-slate-600" />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-green-500/90 backdrop-blur-sm text-white text-xs font-semibold flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    在职求职
                  </div>
                </div>

                {/* Basic Info */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">张伟</h2>
                  <div className="text-sm text-slate-400 mb-3">男 · 36岁 · 硕士</div>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs border border-indigo-500/30">
                      核心人才
                    </span>
                    <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs border border-purple-500/30">
                      技术骨干
                    </span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
                    <Phone className="w-4 h-4 text-indigo-400" />
                    <span className="text-slate-300">138-0000-0000</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
                    <Mail className="w-4 h-4 text-purple-400" />
                    <span className="text-slate-300">zhang.wei@email.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
                    <MapPin className="w-4 h-4 text-pink-400" />
                    <span className="text-slate-300">北京市 · 海淀区</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 border border-indigo-500/20">
                    <div className="text-2xl font-bold text-indigo-400">8年</div>
                    <div className="text-xs text-slate-400 mt-1">工作经验</div>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
                    <div className="text-2xl font-bold text-purple-400">92分</div>
                    <div className="text-xs text-slate-400 mt-1">综合评分</div>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500/10 to-pink-500/5 border border-pink-500/20">
                    <div className="text-2xl font-bold text-pink-400">30K</div>
                    <div className="text-xs text-slate-400 mt-1">期望月薪</div>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20">
                    <div className="text-2xl font-bold text-orange-400">低</div>
                    <div className="text-xs text-slate-400 mt-1">离职风险</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Identity Tags */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl"></div>
              <div className="relative backdrop-blur-xl bg-slate-900/70 border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">身份标签</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['往届毕业生', '在职求职', '技术专家', '党员'].map((tag, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-300 text-xs border border-blue-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Help Index */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl"></div>
              <div className="relative backdrop-blur-xl bg-slate-900/70 border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-semibold text-white">帮扶指数</h3>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">综合评分</span>
                    <span className="text-lg font-bold text-green-400">2.5 / 5.0</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500" style={{ width: '50%' }}></div>
                  </div>
                </div>
                <div className="text-xs text-slate-400">
                  帮扶需求：<span className="text-slate-300">职业发展指导</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Center Area - Tabbed Content */}
          <div className="col-span-6 space-y-6">
            {/* Tab Navigation */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"></div>
              <div className="relative backdrop-blur-xl bg-slate-900/70 border border-slate-700/50 rounded-2xl p-2">
                <div className="grid grid-cols-8 gap-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.name}
                      onClick={() => setActiveTab(tab.name)}
                      className={`relative p-3 rounded-xl transition-all ${
                        activeTab === tab.name
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      <tab.icon className="w-5 h-5 mx-auto mb-1" />
                      <div className="text-xs">{tab.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
              <div className="relative backdrop-blur-xl bg-slate-900/70 border border-slate-700/50 rounded-2xl p-8 min-h-[600px]">
                {activeTab === '基础信息' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white mb-6">基础身份与属性维度</h3>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm text-slate-400">身份证号</label>
                        <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/30 text-white">
                          320102198512275321
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-slate-400">户籍所在地</label>
                        <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/30 text-white">
                          江苏省南京市
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-slate-400">现居住地</label>
                        <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/30 text-white">
                          北京市海淀区
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-slate-400">可工作城市</label>
                        <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/30 text-white">
                          北京、上海、深圳
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-slate-400">婚姻状况</label>
                        <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/30 text-white">
                          已婚
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm text-slate-400">子女情况</label>
                        <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/30 text-white">
                          1个子女（5岁）
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-indigo-400 mt-0.5" />
                        <div>
                          <div className="text-sm font-semibold text-indigo-300 mb-1">地域属性分析</div>
                          <div className="text-xs text-slate-400">
                            候选人户籍地为南京，现居北京，工作年限稳定，家庭稳定性高，适合长期发展岗位。
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === '教育背景' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white mb-6">教育背景与学习能力维度</h3>

                    <div className="space-y-4">
                      {[
                        {
                          degree: '硕士研究生',
                          school: '清华大学',
                          major: '计算机科学与技术',
                          time: '2015.09 - 2018.06',
                          level: '985 / 211 / 双一流',
                          gpa: '3.8 / 4.0',
                          honors: '国家奖学金、优秀毕业生'
                        },
                        {
                          degree: '本科',
                          school: '北京大学',
                          major: '软件工程',
                          time: '2011.09 - 2015.06',
                          level: '985 / 211 / 双一流',
                          gpa: '3.7 / 4.0',
                          honors: '学业奖学金一等奖'
                        }
                      ].map((edu, i) => (
                        <div key={i} className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/30 hover:border-indigo-500/50 transition-all">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="text-lg font-semibold text-white mb-1">{edu.school}</div>
                              <div className="text-sm text-slate-400">{edu.major}</div>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs">
                              {edu.degree}
                            </span>
                          </div>
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <div className="text-slate-500 text-xs mb-1">院校层次</div>
                              <div className="text-slate-300">{edu.level}</div>
                            </div>
                            <div>
                              <div className="text-slate-500 text-xs mb-1">在校时间</div>
                              <div className="text-slate-300">{edu.time}</div>
                            </div>
                            <div>
                              <div className="text-slate-500 text-xs mb-1">绩点</div>
                              <div className="text-slate-300">{edu.gpa}</div>
                            </div>
                            <div>
                              <div className="text-slate-500 text-xs mb-1">荣誉</div>
                              <div className="text-slate-300">{edu.honors}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                        <div className="text-sm text-slate-400 mb-2">语言能力</div>
                        <div className="space-y-1 text-sm text-white">
                          <div>英语：CET-6 (580分) / 雅思 7.5</div>
                          <div>普通话：二级甲等</div>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/20">
                        <div className="text-sm text-slate-400 mb-2">继续教育</div>
                        <div className="space-y-1 text-sm text-white">
                          <div>PMP项目管理认证</div>
                          <div>AWS云架构师认证</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === '职业经历' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white mb-6">职业经历与就业稳定性维度</h3>

                    <div className="mb-6 grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 border border-indigo-500/20 text-center">
                        <div className="text-3xl font-bold text-indigo-400 mb-1">8年</div>
                        <div className="text-xs text-slate-400">总工作年限</div>
                      </div>
                      <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 text-center">
                        <div className="text-3xl font-bold text-purple-400 mb-1">2.7年</div>
                        <div className="text-xs text-slate-400">平均任职时长</div>
                      </div>
                      <div className="p-4 rounded-xl bg-gradient-to-br from-pink-500/10 to-pink-500/5 border border-pink-500/20 text-center">
                        <div className="text-3xl font-bold text-pink-400 mb-1">3次</div>
                        <div className="text-xs text-slate-400">跳槽次数</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        {
                          company: '字节跳动',
                          position: '高级技术专家',
                          time: '2022.03 - 至今 (3年2个月)',
                          industry: '互联网',
                          size: '10000+人',
                          achievement: '主导核心业务架构升级，系统性能提升300%，获年度技术创新奖'
                        },
                        {
                          company: '阿里巴巴',
                          position: '技术专家',
                          time: '2019.06 - 2022.02 (2年8个月)',
                          industry: '互联网',
                          size: '10000+人',
                          achievement: '负责电商中台建设，支撑双11亿级流量，获优秀员工'
                        },
                        {
                          company: '腾讯',
                          position: '高级工程师',
                          time: '2018.07 - 2019.05 (11个月)',
                          industry: '互联网',
                          size: '10000+人',
                          achievement: '参与微信支付核心模块开发，优化交易成功率至99.99%'
                        }
                      ].map((job, i) => (
                        <div key={i} className="relative p-5 rounded-xl bg-slate-800/50 border border-slate-700/30 hover:border-purple-500/50 transition-all">
                          <div className="absolute left-0 top-8 w-1 h-16 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-r"></div>
                          <div className="pl-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <div className="text-lg font-semibold text-white mb-1">{job.company}</div>
                                <div className="text-sm text-slate-400">{job.position}</div>
                              </div>
                              <span className="text-xs text-slate-500">{job.time}</span>
                            </div>
                            <div className="flex gap-4 mb-3 text-xs">
                              <span className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-300">{job.industry}</span>
                              <span className="px-2 py-1 rounded bg-purple-500/10 text-purple-300">{job.size}</span>
                            </div>
                            <div className="text-sm text-slate-300 leading-relaxed">
                              {job.achievement}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === '核心能力' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white mb-6">核心能力与技能维度</h3>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-sm font-semibold text-slate-300 mb-3">专业技能</div>
                        <div className="space-y-2">
                          {[
                            { skill: 'Java/Spring', level: 95, tag: '精通' },
                            { skill: 'Python/Django', level: 88, tag: '熟练' },
                            { skill: '微服务架构', level: 92, tag: '精通' },
                            { skill: 'MySQL/Redis', level: 90, tag: '精通' },
                          ].map((item, i) => (
                            <div key={i}>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-slate-300">{item.skill}</span>
                                <span className="text-xs text-indigo-400">{item.tag}</span>
                              </div>
                              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                  style={{ width: `${item.level}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-semibold text-slate-300 mb-3">通用能力</div>
                        <div className="space-y-2">
                          {[
                            { skill: '沟通表达', level: 90 },
                            { skill: '团队协作', level: 92 },
                            { skill: '问题解决', level: 88 },
                            { skill: '学习能力', level: 94 },
                          ].map((item, i) => (
                            <div key={i}>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-slate-300">{item.skill}</span>
                                <span className="text-xs text-purple-400">{item.level}分</span>
                              </div>
                              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                  style={{ width: `${item.level}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                        <div className="text-sm text-slate-400 mb-2">管理能力</div>
                        <div className="text-xs text-slate-300 space-y-1">
                          <div>• 管理15人技术团队</div>
                          <div>• 主导10+大型项目</div>
                          <div>• 跨部门协调经验丰富</div>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                        <div className="text-sm text-slate-400 mb-2">工具系统</div>
                        <div className="text-xs text-slate-300 space-y-1">
                          <div>• Git/Docker/K8s</div>
                          <div>• JIRA/Confluence</div>
                          <div>• AWS/阿里云</div>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/20">
                        <div className="text-sm text-slate-400 mb-2">核心优势</div>
                        <div className="text-xs text-slate-300 space-y-1">
                          <div>• 大型系统架构设计</div>
                          <div>• 高并发性能优化</div>
                          <div>• 技术团队管理</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === '就业状态' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white mb-6">就业状态与帮扶指数维度</h3>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-5 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          </div>
                          <div>
                            <div className="text-sm text-slate-400">当前状态</div>
                            <div className="text-lg font-semibold text-white">在职（主动求职）</div>
                          </div>
                        </div>
                        <div className="text-xs text-slate-400">
                          已在当前公司工作3年2个月，稳定性良好
                        </div>
                      </div>

                      <div className="p-5 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <div className="text-sm text-slate-400">求职活跃度</div>
                            <div className="text-lg font-semibold text-white">中等</div>
                          </div>
                        </div>
                        <div className="text-xs text-slate-400">
                          近30天投递8份简历，获得3次面试
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/30">
                      <div className="text-sm font-semibold text-slate-300 mb-4">帮扶需求评估</div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-400">帮扶指数</span>
                            <span className="text-lg font-bold text-yellow-400">2.5 / 5.0</span>
                          </div>
                          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500" style={{ width: '50%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-400 mb-2">帮扶等级</div>
                          <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-sm border border-yellow-500/30">
                            一般困难
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 text-xs text-slate-400">
                        主要需求：职业发展指导、高端岗位推荐
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-sm font-semibold text-slate-300">已享受帮扶情况</div>
                      <div className="space-y-2">
                        {[
                          { type: '技能培训', name: '高级架构师课程', time: '2025.03' },
                          { type: '岗位推荐', name: '互联网大厂技术专家', time: '2025.04' },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700/30">
                            <div className="flex items-center gap-3">
                              <span className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 text-xs">
                                {item.type}
                              </span>
                              <span className="text-sm text-slate-300">{item.name}</span>
                            </div>
                            <span className="text-xs text-slate-500">{item.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === '薪资评估' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white mb-6">薪资与价值评估维度</h3>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-5 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 text-center">
                        <div className="text-sm text-slate-400 mb-2">当前月薪</div>
                        <div className="text-3xl font-bold text-green-400 mb-1">26K</div>
                        <div className="text-xs text-slate-500">税前</div>
                      </div>
                      <div className="p-5 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 text-center">
                        <div className="text-sm text-slate-400 mb-2">期望月薪</div>
                        <div className="text-3xl font-bold text-blue-400 mb-1">30-35K</div>
                        <div className="text-xs text-slate-500">可商议</div>
                      </div>
                      <div className="p-5 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-center">
                        <div className="text-sm text-slate-400 mb-2">市场价值</div>
                        <div className="text-3xl font-bold text-purple-400 mb-1">32K</div>
                        <div className="text-xs text-slate-500">行业中位数</div>
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/30">
                      <div className="text-sm font-semibold text-slate-300 mb-4">薪资变化趋势</div>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={salaryTrendData}>
                            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                            <XAxis dataKey="year" stroke="#64748b" style={{ fontSize: 11 }} />
                            <YAxis stroke="#64748b" style={{ fontSize: 11 }} label={{ value: '月薪(K)', angle: -90, position: 'insideLeft', fill: '#64748b' }} />
                            <Line
                              type="monotone"
                              dataKey="salary"
                              stroke="#10b981"
                              strokeWidth={3}
                              dot={{ fill: '#10b981', r: 5 }}
                              activeDot={{ r: 7, fill: '#059669' }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="mt-4 text-xs text-slate-400">
                        近5年薪资年均涨幅：<span className="text-green-400 font-semibold">25%</span>，高于行业平均水平
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                        <div className="text-sm text-slate-400 mb-3">薪资结构偏好</div>
                        <div className="space-y-2 text-xs text-slate-300">
                          <div className="flex items-center justify-between">
                            <span>基本工资</span>
                            <span className="text-indigo-400">70%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>绩效奖金</span>
                            <span className="text-indigo-400">20%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>股权激励</span>
                            <span className="text-indigo-400">10%</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                        <div className="text-sm text-slate-400 mb-3">福利偏好</div>
                        <div className="flex flex-wrap gap-2">
                          {['五险一金', '弹性工作', '带薪年假', '股权激励', '培训机会'].map((item, i) => (
                            <span key={i} className="px-2 py-1 rounded bg-purple-500/20 text-purple-300 text-xs">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === '意向匹配' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white mb-6">就业意向与匹配偏好维度</h3>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/30">
                        <div className="flex items-center gap-2 mb-4">
                          <Building2 className="w-5 h-5 text-indigo-400" />
                          <div className="text-sm font-semibold text-slate-300">行业意向</div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 rounded bg-indigo-500/10 border border-indigo-500/20">
                            <span className="text-sm text-white">互联网</span>
                            <span className="text-xs text-indigo-400">首选</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded bg-slate-700/30">
                            <span className="text-sm text-slate-300">金融科技</span>
                            <span className="text-xs text-slate-500">可接受</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded bg-slate-700/30">
                            <span className="text-sm text-slate-300">人工智能</span>
                            <span className="text-xs text-slate-500">可接受</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/30">
                        <div className="flex items-center gap-2 mb-4">
                          <Target className="w-5 h-5 text-purple-400" />
                          <div className="text-sm font-semibold text-slate-300">岗位意向</div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 rounded bg-purple-500/10 border border-purple-500/20">
                            <span className="text-sm text-white">技术专家</span>
                            <span className="text-xs text-purple-400">首选</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded bg-slate-700/30">
                            <span className="text-sm text-slate-300">架构师</span>
                            <span className="text-xs text-slate-500">可接受</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded bg-slate-700/30">
                            <span className="text-sm text-slate-300">技术总监</span>
                            <span className="text-xs text-slate-500">可接受</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/20">
                        <div className="text-sm text-slate-400 mb-2">工作性质</div>
                        <span className="inline-block px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-sm">
                          全职
                        </span>
                      </div>
                      <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
                        <div className="text-sm text-slate-400 mb-2">工作地点</div>
                        <div className="text-sm text-white">北京、上海</div>
                      </div>
                      <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-sm text-slate-400 mb-2">通勤时间</div>
                        <div className="text-sm text-white">≤ 1小时</div>
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/30">
                      <div className="text-sm font-semibold text-slate-300 mb-4">职业发展期望</div>
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-slate-400 mb-1">短期目标（1-3年）</div>
                          <div className="text-sm text-white">成为技术领域专家，带领团队完成核心项目，提升行业影响力</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400 mb-1">长期规划（3-5年）</div>
                          <div className="text-sm text-white">晋升为技术VP或CTO，负责公司整体技术战略与团队建设</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20">
                      <div className="text-sm font-semibold text-slate-300 mb-3">企业偏好</div>
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div>
                          <div className="text-xs text-slate-400 mb-1">规模</div>
                          <div className="text-white">500-10000人</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400 mb-1">性质</div>
                          <div className="text-white">民企、外企</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400 mb-1">文化</div>
                          <div className="text-white">创新、扁平化</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === '风险评估' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white mb-6">风险评估与潜力预测维度</h3>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-5 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-green-400" />
                            <div className="text-sm font-semibold text-slate-300">离职风险</div>
                          </div>
                          <span className="text-2xl font-bold text-green-400">低</span>
                        </div>
                        <div className="space-y-2 text-xs text-slate-400">
                          <div className="flex items-center justify-between">
                            <span>平均任职时长</span>
                            <span className="text-slate-300">2.7年</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>家庭稳定性</span>
                            <span className="text-green-400">高</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>职业满意度</span>
                            <span className="text-green-400">85分</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-700/30 text-xs text-slate-400">
                          综合评估：稳定性强，长期发展意愿高
                        </div>
                      </div>

                      <div className="p-5 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-purple-400" />
                            <div className="text-sm font-semibold text-slate-300">成长潜力</div>
                          </div>
                          <span className="text-2xl font-bold text-purple-400">高</span>
                        </div>
                        <div className="space-y-2 text-xs text-slate-400">
                          <div className="flex items-center justify-between">
                            <span>学习能力</span>
                            <span className="text-purple-400">94分</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>成长速度</span>
                            <span className="text-purple-400">快速</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>可培养性</span>
                            <span className="text-purple-400">90分</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-700/30 text-xs text-slate-400">
                          综合评估：优秀的学习能力，值得长期培养
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-slate-800/50 border border-slate-700/30">
                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle className="w-5 h-5 text-blue-400" />
                        <div className="text-sm font-semibold text-slate-300">诚信记录</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
                          <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
                          <div className="text-xs text-slate-400 mb-1">学历验证</div>
                          <div className="text-sm font-semibold text-green-400">已通过</div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
                          <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
                          <div className="text-xs text-slate-400 mb-1">工作经历</div>
                          <div className="text-sm font-semibold text-green-400">已核实</div>
                        </div>
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
                          <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
                          <div className="text-xs text-slate-400 mb-1">职业记录</div>
                          <div className="text-sm font-semibold text-green-400">良好</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 rounded-xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                          <div className="text-lg font-semibold text-white">综合适配度评分</div>
                        </div>
                        <div className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                          9.2 / 10
                        </div>
                      </div>
                      <div className="grid grid-cols-5 gap-3 text-center text-xs">
                        <div>
                          <div className="text-2xl font-bold text-indigo-400 mb-1">9.5</div>
                          <div className="text-slate-400">技能匹配</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-400 mb-1">9.0</div>
                          <div className="text-slate-400">经验匹配</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-pink-400 mb-1">9.3</div>
                          <div className="text-slate-400">文化契合</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-orange-400 mb-1">8.8</div>
                          <div className="text-slate-400">薪资匹配</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-yellow-400 mb-1">9.4</div>
                          <div className="text-slate-400">发展潜力</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar - Charts & Analytics */}
          <div className="col-span-3 space-y-6">
            {/* Ability Radar Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
              <div className="relative backdrop-blur-xl bg-slate-900/70 border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-lg font-semibold text-white">能力评估</h3>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={abilityRadarData}>
                      <PolarGrid stroke="#475569" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#94a3b8', fontSize: 11 }}
                      />
                      <PolarRadiusAxis
                        stroke="#475569"
                        tick={{ fill: '#64748b', fontSize: 10 }}
                        domain={[0, 100]}
                      />
                      <Radar
                        dataKey="value"
                        stroke="#6366f1"
                        fill="#6366f1"
                        fillOpacity={0.5}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>

            {/* Job Activity Trend */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl"></div>
              <div className="relative backdrop-blur-xl bg-slate-900/70 border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">求职活跃度</h3>
                </div>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={jobActivityData}>
                      <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                      <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: 11 }} />
                      <YAxis stroke="#64748b" style={{ fontSize: 11 }} />
                      <Area
                        type="monotone"
                        dataKey="count"
                        stroke="#06b6d4"
                        fill="url(#areaGradient)"
                        strokeWidth={2}
                      />
                      <defs>
                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.6}/>
                          <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"></div>
              <div className="relative backdrop-blur-xl bg-slate-900/70 border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-semibold text-white">快捷操作</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: '推荐岗位', icon: Target, color: 'from-indigo-500 to-blue-500' },
                    { label: '导出简历', icon: FileText, color: 'from-purple-500 to-pink-500' },
                    { label: '培训计划', icon: GraduationCap, color: 'from-pink-500 to-orange-500' },
                    { label: '面试安排', icon: Calendar, color: 'from-orange-500 to-yellow-500' },
                  ].map((action, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 rounded-xl bg-gradient-to-r ${action.color} text-white shadow-lg hover:shadow-xl transition-all`}
                    >
                      <action.icon className="w-5 h-5 mx-auto mb-1" />
                      <div className="text-xs">{action.label}</div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}