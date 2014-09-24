﻿// ==UserScript==
// @name        Prix au Go Materiel.net
// @namespace   1twitif
// @include     http://www.materiel.net/*
// @version     1
// @grant       none
// @require     //www.materiel.net/js/jquery/lib/jquery.min.js
// ==/UserScript==
$(document).ready(function(){
	$('body').append('<style>.prixAuGiga{font-size:75%;font-weight:normal;}</style>');
	updatePrixAuGiga();
});
setInterval(updatePrixAuGiga,1000);

function updatePrixAuGiga(){
	$('.Price, .price').each(function(){
		try{
			var giga = gigaFinder($(this));
			var prix = priceFinder($(this));
			var prixAuGiga = prix/giga;
			if (!isFinite(prixAuGiga) || prixAuGiga<=0) throw {'prix':prixAuGiga, 'text':'prix invalide'};
			afficherPrixAuGiga($(this), prixAuGiga);
		}catch(e){
			console.log(e);
		}
	});
}
function gigaFinder(jQNode){
	if($('#page',jQNode).length) throw 'Trop haut sans résultat !';
	var giga = 0;
	jQNode.text().replace(/([0-9]+) Go/g,function(all, number){
		if(giga && jQNode.attr('id')!='prod') throw 'Trop haut avec plusieurs résultats !';
		if(!giga) giga = parseInt(number);
	});
	// multi disque
	jQNode.text().replace(/([0-9]+) x [0-9To ]+ [(]([0-9]+) Go[)]/,function(all, qty, number){
		giga = qty * number;
	});
	
	if(!giga) return gigaFinder(jQNode.parent());
	else return giga;
}
function priceFinder(jQNode){
	var prix = 0;
	jQNode.text().replace(/([,0-9]+)[ ]?€/,function(all, number){
		prix = parseFloat(number);
	});
	if(!prix) throw 'Aucun prix trouvé';
	return prix;
}
function afficherPrixAuGiga(jQNode, prixAuGiga){
	if($('.prixAuGiga',jQNode)) $('.prixAuGiga',jQNode).html('<span class="prix">'+prixAuGiga+'</span>€/Go');
	else jQNode.append('<span class="prixAuGiga"><span class="prix">'+prixAuGiga+'</span>€/Go</span>');
}
