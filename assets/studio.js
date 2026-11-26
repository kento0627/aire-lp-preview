'use strict';
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
const motionButtons=[...document.querySelectorAll('[data-motion-toggle]')];document.body.classList.add('motion-ready');
let userPaused=false;
function renderMotionState(){const paused=userPaused||reduceMotion.matches;document.body.classList.toggle('motion-paused',paused);document.body.classList.toggle('page-hidden',document.hidden);for(const motionButton of motionButtons){motionButton.setAttribute('aria-pressed',String(paused));motionButton.querySelector('span:first-child').textContent=paused?'▶':'Ⅱ';motionButton.querySelector('span:last-child').textContent=reduceMotion.matches?'省動作で表示中':paused?'動きを再開する':'動きを止める';motionButton.disabled=reduceMotion.matches;}}
motionButtons.forEach(button=>button.addEventListener('click',()=>{userPaused=!userPaused;renderMotionState();}));
reduceMotion.addEventListener('change',renderMotionState);
document.addEventListener('visibilitychange',renderMotionState);
const observer=new IntersectionObserver(entries=>{for(const entry of entries)entry.target.classList.toggle('is-visible',entry.isIntersecting);},{threshold:0.12});
document.querySelectorAll('.motion-block').forEach(el=>observer.observe(el));
renderMotionState();
document.querySelectorAll('[data-consult]').forEach(a=>a.addEventListener('click',()=>{document.querySelector('#consult-type').value=a.dataset.consult;}));
document.querySelector('#consult-form').addEventListener('submit',event=>{event.preventDefault();const field=document.querySelector('#consult-body');const body=field.value.trim();const status=document.querySelector('#brief-status');if(!body){field.setAttribute('aria-invalid','true');status.textContent='今あるものや変えたいことを、一言入力してください。';field.focus();return;}field.removeAttribute('aria-invalid');const text='AIRe 相談メモ\n\n相談したいこと：'+document.querySelector('#consult-type').value+'\n\n今あるもの・変えたいこと：\n'+body+'\n\nこのメモは端末に保存したもので、送信されていません。';const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='aire-consultation.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='保存用の相談メモを作成しました。お問い合わせはまだ送信されていません。';});
