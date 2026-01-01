
import React, { useState, useEffect } from 'react';
import { User, ArrowLeft, ArrowRight, Printer, Lock, ClipboardList, FileText as FileIcon, GraduationCap, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { mcmiQuestions } from '../data/mcmiData';
import { calculateScores, scaleNames } from '../utils/mcmiScoring';
import { ScoreReport, UserInfo } from '../types';
import { toPersianDigits } from '../utils';
import { useAuth } from '../context/AuthContext';

const McmiPage: React.FC = () => {
  const { user, isAuthenticated, updateUser } = useAuth();
  const [step, setStep] = useState<'info' | 'test' | 'report'>('info');
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 25;
  
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    code: '',
    age: 0,
    gender: 'male',
    education: '',
    maritalStatus: '',
    inpatientStatus: '1'
  });

  const [answers, setAnswers] = useState<boolean[]>(new Array(175).fill(false));
  const [report, setReport] = useState<ScoreReport | null>(null);

  // Pre-fill but allow editing
  useEffect(() => {
    if (user && step === 'info') {
      setUserInfo(prev => ({
        ...prev,
        name: user.fullNameFa || '',
        age: user.age || 0,
        gender: user.gender || 'male',
        education: user.education || '',
        maritalStatus: user.maritalStatus || ''
      }));

      if (user.mcmiStatus === 'approved' && user.mcmiReport) {
          setReport(user.mcmiReport);
          setStep('report');
      }
    }
  }, [user]);

  const totalPages = Math.ceil(mcmiQuestions.length / questionsPerPage);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white max-w-lg w-full rounded-3xl p-8 shadow-lg text-center border border-gray-100">
           <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock size={40} />
           </div>
           <h2 className="text-2xl font-bold text-gray-900 mb-4">دسترسی محدود</h2>
           <p className="text-gray-600 mb-8 leading-relaxed">برای انجام این آزمون و مشاهده نتایج، ابتدا باید وارد حساب کاربری خود شوید.</p>
           <Link to="/login"><Button size="lg" className="w-full">ورود به حساب کاربری</Button></Link>
        </div>
      </div>
    );
  }

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.age) {
        alert('لطفا نام و سن را به درستی وارد کنید.');
        return;
    }
    setStep('test');
    window.scrollTo(0, 0);
  };

  const handleAnswerChange = (index: number, value: boolean) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const finishTest = () => {
    const result = calculateScores(answers, userInfo);
    result.testDate = new Date().toLocaleDateString('en-US');
    setReport(result);
    // Note: We save the report to user context, but userInfo can be different from user profile
    updateUser({ mcmiStatus: 'approved', mcmiReport: result });
    setStep('report');
    window.scrollTo(0, 0);
  };

  const renderInfoForm = () => (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-lg border border-gray-100 animate-fade-in-up">
      <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand/5 text-brand rounded-2xl flex items-center justify-center mx-auto mb-4"><User size={32} /></div>
          <h2 className="text-2xl font-bold text-gray-900">مشخصات آزمون‌دهنده (MCMI-II)</h2>
          <p className="text-gray-500 mt-2 text-sm">مشخصات وارد شده در این بخش صرفاً جهت درج در گزارش نهایی استفاده می‌شود.</p>
      </div>
      <form onSubmit={handleInfoSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name - Now Always Editable */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">نام و نام خانوادگی</label>
            <input 
              type="text" 
              required 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-brand transition-all" 
              value={userInfo.name} 
              onChange={e => setUserInfo({...userInfo, name: e.target.value})} 
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">سن</label>
            <input type="number" required min="18" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-brand" value={userInfo.age || ''} onChange={e => setUserInfo({...userInfo, age: parseInt(e.target.value)})} />
          </div>

          {/* Education - Added for Final Report consistency */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
              <GraduationCap size={16} className="text-gray-400" /> تحصیلات
            </label>
            <input 
              type="text" 
              placeholder="مثلاً: کارشناسی روانشناسی"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-brand" 
              value={userInfo.education} 
              onChange={e => setUserInfo({...userInfo, education: e.target.value})} 
            />
          </div>

          {/* Marital Status - Added for Final Report consistency */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
              <Heart size={16} className="text-gray-400" /> وضعیت تأهل
            </label>
            <select 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-brand"
              value={userInfo.maritalStatus}
              onChange={e => setUserInfo({...userInfo, maritalStatus: e.target.value})}
            >
              <option value="">انتخاب کنید...</option>
              <option value="مجرد">مجرد</option>
              <option value="متاهل">متاهل</option>
              <option value="متارکه">متارکه</option>
              <option value="N/A">نامشخص</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">جنسیت</label>
            <div className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <label className="flex-1 flex items-center justify-center gap-2 cursor-pointer p-1">
                <input type="radio" name="gender" checked={userInfo.gender === 'male'} onChange={() => setUserInfo({...userInfo, gender: 'male'})} className="text-brand" />
                <span className="text-sm font-medium">مرد</span>
              </label>
              <label className="flex-1 flex items-center justify-center gap-2 cursor-pointer p-1">
                <input type="radio" name="gender" checked={userInfo.gender === 'female'} onChange={() => setUserInfo({...userInfo, gender: 'female'})} className="text-brand" />
                <span className="text-sm font-medium">زن</span>
              </label>
            </div>
          </div>

          {/* Inpatient Status */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">وضعیت بستری</label>
            <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-brand" value={userInfo.inpatientStatus} onChange={e => setUserInfo({...userInfo, inpatientStatus: e.target.value as any})}>
                <option value="1">سرپایی (Outpatient)</option>
                <option value="2">بستری کمتر از ۱ هفته</option>
                <option value="3">بستری ۱ تا ۴ هفته</option>
                <option value="4">بستری بیش از ۴ هفته</option>
            </select>
          </div>
        </div>
        <div className="pt-6">
          <Button type="submit" size="lg" className="w-full py-4 text-lg gap-2">شروع پاسخگویی به سوالات <ArrowLeft size={20} /></Button>
        </div>
      </form>
    </div>
  );

  const renderTest = () => {
    const startIndex = currentPage * questionsPerPage;
    const currentQuestions = mcmiQuestions.slice(startIndex, startIndex + questionsPerPage);
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div className="bg-brand text-white p-6 rounded-3xl shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md"><ClipboardList size={24} /></div>
                <h2 className="font-bold text-lg">پرسشنامه میلون ۲ (MCMI-II)</h2>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-full text-sm font-bold border border-white/20">صفحه {toPersianDigits(currentPage + 1)} از {toPersianDigits(totalPages)}</div>
        </div>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-100">
            {currentQuestions.map((q, idx) => (
                <div key={startIndex + idx} className="p-5 md:p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="shrink-0 w-8 h-8 bg-gray-100 text-gray-500 rounded-lg flex items-center justify-center text-xs font-bold font-mono">{toPersianDigits(startIndex + idx + 1)}</span>
                    <p className="text-gray-800 leading-7 font-medium">{q}</p>
                  </div>
                  <div className="flex gap-2 shrink-0 self-end sm:self-center">
                    <button onClick={() => handleAnswerChange(startIndex + idx, true)} className={`px-6 py-2 rounded-xl text-sm font-bold transition-all border ${answers[startIndex + idx] === true ? 'bg-green-600 border-green-600 text-white shadow-md' : 'bg-white border-gray-200 text-gray-400 hover:border-green-200'}`}>بلی</button>
                    <button onClick={() => handleAnswerChange(startIndex + idx, false)} className={`px-6 py-2 rounded-xl text-sm font-bold transition-all border ${answers[startIndex + idx] === false ? 'bg-red-600 border-red-600 text-white shadow-md' : 'bg-white border-gray-200 text-gray-400 hover:border-green-200'}`}>خیر</button>
                  </div>
                </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center pt-4">
          <Button variant="outline" disabled={currentPage === 0} onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo(0,0); }} className="gap-2 px-8"><ArrowRight size={20} /> صفحه قبل</Button>
          {currentPage === totalPages - 1 ? (
            <Button size="lg" onClick={finishTest} className="px-10 bg-brand text-white hover:bg-brand-dark shadow-xl shadow-brand/20">ثبت نهایی و مشاهده تحلیل MCMI-II</Button>
          ) : (
            <Button size="lg" onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo(0,0); }} className="gap-2 px-10">صفحه بعد <ArrowLeft size={20} /></Button>
          )}
        </div>
      </div>
    );
  };

  const renderReport = () => {
    if (!report) return null;
    const rowIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
    const getInpatientLabel = (val: string) => {
      switch(val) {
        case '1': return 'Outpatient';
        case '2': return 'Inpatient < 1 week';
        case '3': return 'Inpatient 1-4 weeks';
        case '4': return 'Inpatient > 4 weeks';
        default: return 'N/A';
      }
    };

    return (
      <div className="max-w-6xl mx-auto bg-white p-4 md:p-10 rounded-lg shadow-xl font-mono text-[11px] md:text-[13px] print:shadow-none print:p-0" dir="ltr">
        <div className="text-center mb-8 border-b-2 border-black pb-4">
          <h1 className="text-2xl font-bold uppercase tracking-widest">MCMI-II Final Report</h1>
          <h2 className="text-lg font-semibold text-gray-700">Ravankargah Institute</h2>
        </div>

        <div className="flex justify-end mb-4 print:hidden">
          <Button onClick={() => window.print()} variant="outline" className="gap-2 border-black text-black hover:bg-black hover:text-white px-4 py-2 text-xs font-bold">
            <Printer size={16} /> Print / Save PDF
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-8 mb-8 border border-gray-300 p-4 rounded bg-gray-50 leading-relaxed">
          <div><span className="font-bold">Name:</span> {userInfo.name}</div>
          <div><span className="font-bold">Age:</span> {userInfo.age}</div>
          <div><span className="font-bold">Gender:</span> {userInfo.gender === 'male' ? 'Male' : 'Female'}</div>
          <div><span className="font-bold">Education:</span> {userInfo.education || 'N/A'}</div>
          <div><span className="font-bold">Marital Status:</span> {userInfo.maritalStatus || 'N/A'}</div>
          <div><span className="font-bold">Inpatient:</span> {getInpatientLabel(userInfo.inpatientStatus)}</div>
          <div><span className="font-bold">Date:</span> {report.testDate || new Date().toLocaleDateString('en-US')}</div>
          <div><span className="font-bold">X (Disclosure):</span> {report.xScore}</div>
        </div>

        <div className="overflow-x-auto border border-black">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-black">
                <th className="p-2 border-r border-black font-bold">Code</th>
                <th className="p-2 border-r border-black font-bold text-left">Scale</th>
                <th className="p-2 border-r border-black font-bold">Raw</th>
                <th className="p-2 border-r border-black font-bold">BR</th>
                <th className="p-2 border-r border-black font-bold">X Cor</th>
                <th className="p-2 border-r border-black font-bold">1/2X</th>
                <th className="p-2 border-r border-black font-bold">DA</th>
                <th className="p-2 border-r border-black font-bold">DD</th>
                <th className="p-2 border-r border-black font-bold">DC</th>
                <th className="p-2 border-r border-black font-bold">Inp</th>
                <th className="p-2 font-bold bg-gray-200">Final</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {rowIds.map(id => {
                const s = report.adjustedScores[id];
                const meta = scaleNames[id];
                const isSevere = [13, 14, 15, 22, 23, 24].includes(parseInt(id));
                const hasDA = [4, 12, 14].includes(parseInt(id));
                const hasDD = [13, 14, 16, 17, 19].includes(parseInt(id));
                const hasDC = [13, 14, 15, 16, 17, 19].includes(parseInt(id));
                const hasInp = [22, 23, 24].includes(parseInt(id));

                return (
                  <tr key={id} className="hover:bg-gray-50">
                    <td className="p-2 border-r border-gray-300 font-bold">{meta.code}</td>
                    <td className="p-2 border-r border-gray-300 text-left font-medium">{meta.enName}</td>
                    <td className="p-2 border-r border-gray-300">{s.raw}</td>
                    <td className="p-2 border-r border-gray-300">{s.br}</td>
                    <td className="p-2 border-r border-gray-300">{!isSevere ? s.xCor : '-'}</td>
                    <td className="p-2 border-r border-gray-300">{isSevere ? s.hxCor : '-'}</td>
                    <td className="p-2 border-r border-gray-300">{hasDA ? s.daAdj : '-'}</td>
                    <td className="p-2 border-r border-gray-300">{hasDD ? s.ddAdj : '-'}</td>
                    <td className="p-2 border-r border-gray-300">{hasDC ? s.dcAdj : '-'}</td>
                    <td className="p-2 border-r border-gray-300">{hasInp ? s.inpAdj : '-'}</td>
                    <td className={`p-2 font-black bg-gray-50`}>{s.final}</td>
                  </tr>
                );
              })}
              <tr className="bg-gray-100 font-bold border-t border-black">
                <td className="p-2 border-r border-gray-300">X</td>
                <td className="p-2 border-r border-gray-300 text-left">Disclosure</td>
                <td className="p-2 border-r border-gray-300">118</td>
                <td className="p-2 border-r border-gray-300">0</td>
                <td className="p-2 border-r border-gray-300">-</td>
                <td className="p-2 border-r border-gray-300">-</td>
                <td className="p-2 border-r border-gray-300">-</td>
                <td className="p-2 border-r border-gray-300">-</td>
                <td className="p-2 border-r border-gray-300">-</td>
                <td className="p-2 border-r border-gray-300">-</td>
                <td className="p-2 bg-gray-200">{report.xScore}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 space-y-2 text-gray-600 text-[10px] md:text-xs">
          <p>* BR scores of 75-84 indicate the presence of a trait/disorder.</p>
          <p>* BR scores of 85+ indicate the prominence of a trait/disorder.</p>
          <div className="h-px bg-gray-200 my-4"></div>
          <p className="text-center font-bold text-black uppercase tracking-widest">Ravankargah Institute - Educational Clinical Assessment System</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 print:hidden">
           <div className="inline-block p-3 bg-brand/5 rounded-2xl mb-4"><FileIcon size={48} className="text-brand" /></div>
           <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">آزمون بالینی چندمحوری میلون ۲ (MCMI-II)</h1>
           <div className="w-24 h-1.5 bg-accent mx-auto rounded-full"></div>
        </div>
        {step === 'info' && renderInfoForm()}
        {step === 'test' && renderTest()}
        {step === 'report' && renderReport()}
      </div>
    </div>
  );
};

export default McmiPage;
