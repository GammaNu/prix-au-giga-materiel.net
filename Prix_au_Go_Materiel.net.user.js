﻿// ==UserScript==
// @name        Prix au Go Materiel.net
// @namespace   1twitif
// @include     http://www.materiel.net/*
// @version     1
// @grant       none
// @require     //www.materiel.net/js/jquery/lib/jquery.min.js
// ==/UserScript==
console.log('debut');
$(document).ready(function(){
	console.log('jQuery executé');
	$('.Price').each(function(){
		try{
			var giga = gigaFinder($(this));
			var prix = priceFinder($(this));
			var prixAuGiga = prix/giga;
			afficherPrixAuGiga($(this), prixAuGiga);
		}catch(e){
			console.log(e);
		}
	});
	$('body').append('<style>.prixAuGiga{font-size:12px;font-weight:normal;}</style>')
	function gigaFinder(jQNode){
		var giga = 0;
		jQNode.text().replace(/([0-9]+) Go/,function(all, number){
			giga = parseInt(number);
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
		jQNode.append('<span class="prixAuGiga"><span class="prix">'+prixAuGiga+'</span>€/Go</span>');
	}
});