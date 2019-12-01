// Initialize your app
var internet;
document.addEventListener('online',this.online,false);
document.addEventListener('offline',this.offline,false);
function online(){
  internet = true;
}

function offline(){
 internet = false;
}
var myApp = new Framework7({
    animateNavBackIcon: true,
    // Enable templates auto precompilation
    precompileTemplates: true,
    // Enabled pages rendering using Template7
	swipeBackPage: false,
	swipeBackPageThreshold: 1,
	swipePanel: "left",
	swipePanelCloseOpposite: true,
	pushState: true,
	pushStateRoot: undefined,
	pushStateNoAnimation: false,
	pushStateSeparator: '#!/',
    template7Pages: true
});
var ajaxUrl = "http://learning.smkkesehatanrajawali.sch.id/api";
var base_url = "http://learning.smkkesehatanrajawali.sch.id";
// Export selectors engine
var $$ = Dom7;
var storage = $.localStorage;
// Add main View
var mainView = myApp.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: false
});
mainView.router.loadPage("index.html");


function checkconnection() {
	
   var status = navigator.onLine;
    if (status) {
      return true;
    } else {
      return false;
    }
}
// $$('.popup-login').on('submit',"#LoginForm", function (e) {
//   var d = $(this).serializeArray();
//   console.log(d);
// });
$$("form.ajax-submit").on('submitError',"#LoginForm",function(e) {
  var xhr = e.detail.xhr;
  var data = e.detail.data;
  console.log("error");
  myApp.addNotification({
      title: 'Login Gagal',
      message: 'Silahkan Periksa Kembali Username dan Password'
  });
  $$("#LoginForm")[0].reset();
  myApp.hidePreloader();
});
$$(".popup-login").on('popup:opened',  function(event) {
  event.preventDefault();
  console.log("Popup");
});

$$(document).on('pageInit', function (e) {
    console.log("Init Page");

    $$('form.ajax-submit').on('submitted',"#LoginForm", function (e) {
      var xhr = e.detail.xhr;
      var data = e.detail.data;
      var datajson = JSON.parse(data);
      if (datajson.status == 1) {
        myApp.addNotification({
            title: 'Login Berhasil',
            message: 'Anda Berhasil Login',
            onClose: function () {
              console.log("Close");
              myApp.closeModal();
              storage.set({user_login:1});
              storage.set({nis:datajson.data.nis});
              storage.set({password:datajson.data.password});
              mainView.router.loadPage('ujian.html');
            }
        });
      }else {
        myApp.addNotification({
            title: 'Login Gagal',
            message: 'Silahkan Periksa Kembali Username dan Password'
        });
      }
      myApp.hidePreloader();
    });
    $$('form.ajax-submit').on('beforeSubmit',"#LoginForm", function (e) {
      console.log("before");
      var xhr = e.detail.xhr;
      var data = e.detail.data;
      myApp.showPreloader();
    });
    $(".swipebox").swipebox();

		$("#ContactForm").validate({
		submitHandler: function(form) {
		ajaxContact(form);
		return false;
		}
		});

		$("#RegisterForm").validate();
		$("#LoginForm").validate();
		$("#ForgotForm").validate();

		$('a.backbutton').click(function(){
			parent.history.back();
			return false;
		});


		$(".posts li").hide();
		size_li = $(".posts li").size();
		x=4;
		$('.posts li:lt('+x+')').show();
		$('#loadMore').click(function () {
			x= (x+1 <= size_li) ? x+1 : size_li;
			$('.posts li:lt('+x+')').show();
			if(x == size_li){
				$('#loadMore').hide();
				$('#showLess').show();
			}
		});


	$("a.switcher").bind("click", function(e){
		e.preventDefault();

		var theid = $(this).attr("id");
		var theproducts = $("ul#photoslist");
		var classNames = $(this).attr('class').split(' ');


		if($(this).hasClass("active")) {
			// if currently clicked button has the active class
			// then we do nothing!
			return false;
		} else {
			// otherwise we are clicking on the inactive button
			// and in the process of switching views!

  			if(theid == "view13") {
				$(this).addClass("active");
				$("#view11").removeClass("active");
				$("#view11").children("img").attr("src","images/switch_11.png");

				$("#view12").removeClass("active");
				$("#view12").children("img").attr("src","images/switch_12.png");

				var theimg = $(this).children("img");
				theimg.attr("src","images/switch_13_active.png");

				// remove the list class and change to grid
				theproducts.removeClass("photo_gallery_11");
				theproducts.removeClass("photo_gallery_12");
				theproducts.addClass("photo_gallery_13");

			}

			else if(theid == "view12") {
				$(this).addClass("active");
				$("#view11").removeClass("active");
				$("#view11").children("img").attr("src","images/switch_11.png");

				$("#view13").removeClass("active");
				$("#view13").children("img").attr("src","images/switch_13.png");

				var theimg = $(this).children("img");
				theimg.attr("src","images/switch_12_active.png");

				// remove the list class and change to grid
				theproducts.removeClass("photo_gallery_11");
				theproducts.removeClass("photo_gallery_13");
				theproducts.addClass("photo_gallery_12");

			}
			else if(theid == "view11") {
				$("#view12").removeClass("active");
				$("#view12").children("img").attr("src","images/switch_12.png");

				$("#view13").removeClass("active");
				$("#view13").children("img").attr("src","images/switch_13.png");

				var theimg = $(this).children("img");
				theimg.attr("src","images/switch_11_active.png");

				// remove the list class and change to grid
				theproducts.removeClass("photo_gallery_12");
				theproducts.removeClass("photo_gallery_13");
				theproducts.addClass("photo_gallery_11");

			}

		}

	});

	document.addEventListener('touchmove', function(event) {
	   if(event.target.parentNode.className.indexOf('navbarpages') != -1 || event.target.className.indexOf('navbarpages') != -1 ) {
		event.preventDefault(); }
	}, false);

	// Add ScrollFix
	var scrollingContent = document.getElementById("pages_maincontent");
	new ScrollFix(scrollingContent);


	var ScrollFix = function(elem) {
		// Variables to track inputs
		var startY = startTopScroll = deltaY = undefined,

		elem = elem || elem.querySelector(elem);

		// If there is no element, then do nothing
		if(!elem)
			return;

		// Handle the start of interactions
		elem.addEventListener('touchstart', function(event){
			startY = event.touches[0].pageY;
			startTopScroll = elem.scrollTop;

			if(startTopScroll <= 0)
				elem.scrollTop = 1;

			if(startTopScroll + elem.offsetHeight >= elem.scrollHeight)
				elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
		}, false);
	};



})

function urlBuild(cmd) {
  com = ajaxUrl+"/"+cmd+"?nis="+storage.get("nis")+"&password="+storage.get("password");
  return com;
}
function butir(d) {
  html = [];
  for (var i = 0; i < d.length; i++) {
    name = 'jawaban['+d[i].id+']';
    if (d[i].tipe == "pg") {
      pg_a = d[i].pg_a;
      pg_b = d[i].pg_b;
      pg_c = d[i].pg_c;
      pg_d = d[i].pg_d;
      pg_e = d[i].pg_e;
      temp = '<div class="card" style="padding:5px 5px 5px"><p>'+d[i].soal+'</p><label class="label-radio item-content"><input type="radio" name="'+name+'" value="A"><div class="item-inner"><div class="item-title">A. '+pg_a+'</div></div></label><label class="label-radio item-content"><input type="radio" name="'+name+'" value="B"><div class="item-inner"><div class="item-title">B. '+pg_b+'</div></div></label><label class="label-radio item-content"><input type="radio" name="'+name+'" value="C"><div class="item-inner"><div class="item-title">C. '+pg_c+'</div></div></label><label class="label-radio item-content"><input type="radio" name="'+name+'" value="D"><div class="item-inner"><div class="item-title">D. '+pg_d+'</div></div></label><label class="label-radio item-content"><input type="radio" name="'+name+'" value="E"><div class="item-inner"><div class="item-title">E. '+pg_e+'</div></div></label></div>';
    }else {
      temp = '<div class="card" style="padding:5px 5px 5px"><p>'+d[i].soal+'</p><textarea name="'+name+'" class="form_textarea" rows="" cols=""></textarea></div>';
    }
    html.push(temp);
  }
  return html;
}

$$(document).on("pageInit",'.page[data-page="ujian-form"]',function(e){
  if (storage.get("user_login") != 1) {
    console.log("Not Login");
    location.href="./#!/index.html";
  }else {
    data = storage.get("soal_tersimpan");
    selected = data[storage.get("pin_verifikasi")];
    soal = selected.soal;
    html = butir(soal);
    html.push('<div class="card" style="padding:5px 5px 5px"><button type="submit" class="button">Simpan Data Ujian</button></div>')
    $("#form").html(html.join(""));
    $("#form").on('submit', function(event) {
      event.preventDefault();
      dform = $(this).serializeArray();
      dform[dform.length] = {name:"ujian_id",value:storage.get("pin_verifikasi")};
      dform[dform.length] = {name:"nis_siswa",value:storage.get("nis")};
      nold = [];
      old = storage.get("jawaban_soal");
      if (old == null) {
        nold[storage.get("pin_verifikasi")] = dform;
        storage.set("jawaban_soal",nold);
      }else {
        nold = old;
        nold[storage.get("pin_verifikasi")] = dform;
        storage.set("jawaban_soal",nold);
      }
      storage.remove("pin_verifikasi");
      myApp.addNotification({
        title: 'Data Telah di Simpan',
        message: 'Jangan lupa Untuk Upload ke Database Sekolah yah '
      });
      mainView.router.loadPage("ujian.html");
    });
  }
});
var dtable = null;
$$(document).on("pageInit",'.page[data-page="ujian"]',function(e){
  console.log(e);
  console.log("Halaman Ujian");
  console.log($(this).data());
  $(".refresh").on('click', function(event) {
    event.preventDefault();
    console.log("reloadit");
    if (checkconnection()) {
      myApp.addNotification({
        title: 'Internet Kamu Masih Aktif Lohhh ...',
        message: 'Matikan dulu dong'
      });
    }else {
      console.log("Internet Mati");
      if (storage.get("soal_tersimpan") == null) {
        myApp.addNotification({
          title: 'Data soalnya gak ada ',
          message: 'Sebelum matiin internet download dulu ya soal ujiannya'
        });
      }else {
        soallist = storage.get("soal_tersimpan");
        console.log(soallist);
        myApp.addNotification({
          title: 'Internet Tidak Aktif',
          message: 'Selamat Mengerjakan Soal'
        });
        data = [];
		if(dtable != null){
			dtable.destroy();
		}
        no = 1;
        i = 0;
        $.each(soallist,function(index, el) {
          buka = moment(el.buka).format("DD-MM-YYYY HH:mm:ss");
          tutup = moment(el.tutup).format("DD-MM-YYYY HH:mm:ss");
          if (el.ditutup == null) {
            tutup = "Tak Terbatas";
          }
          formatted = "("+buka+") -> ("+tutup+")";
          djawaban = storage.get("jawaban_soal");
          if (djawaban != null) {
            if (djawaban[index] != undefined) {
              data[i++] = [no++,el.matpel,formatted,el.waktu+" Menit",null,"<button class='button sync'  data-id='"+index+"'>Upload</button>"];
            }else {
              data[i++] = [no++,el.matpel,formatted,el.waktu+" Menit",null,"<button class='button kerjakan'  data-id='"+index+"'>Kerjakan</button>"];
            }
          }else {
            data[i++] = [no++,el.matpel,formatted,el.waktu+" Menit",null,"<button class='button kerjakan'  data-id='"+index+"'>Kerjakan</button>"];
          }
        });
        console.log(data);
        dtable = $("#dtable").DataTable({
          searching: false,
          ordering:false,
          bPaginate: false,
          bLengthChange: false,
          bFilter: true,
          bInfo: false,
          bAutoWidth: false,
          data:data,
          responsive: true,
        });
      }

    }
  });
  if (storage.get("user_login") != 1) {
    console.log("Not Login");
    location.href="./#!/index.html";
  }else {
    console.log("Login");
    ajax = urlBuild("listujian/"+storage.get("nis"));
    console.log(ajax);
    if (checkconnection()) {
	
      dtable = $("#dtable").DataTable({
        searching: false,
        ordering:false,
        bPaginate: false,
        bLengthChange: false,
        bFilter: true,
        bInfo: false,
        bAutoWidth: false,
        responsive: true,
        ajax:ajax,
        createdRow:function(r,d,i){
          btn = d[5];
          buka = storage.get("jawaban_soal");
          if (buka != null) {
            id = $(btn).data("id");
            if (id != undefined) {
              if (buka[id] != undefined) {
                btnPlus = "<button class='button sync'  data-id='"+id+"'>Upload</button>";
                btn = btn + btnPlus;
              }
            }
          }
          $("td",r).eq(5).html(btn);
        }
      });
      $("#dtable").on('click', '.unduh', function(event) {
        event.preventDefault();
        console.log("Unduh");
        id = $(this).data("id");
        console.log(id);
        url = urlBuild("listsoal/"+id);
        console.log(url);
        $.get(url,function(r){
          if (storage.get("soal_tersimpan") != null) {
            if (storage.get("soal_tersimpan")[id] == undefined) {
              if (r.status == 1) {
                old = storage.get("soal_tersimpan");
                dnew = [];
                if (old != null) {
                  dnew = old;
                  dnew[id] = r.data[id];
                }else {
                  dnew = r.data;
                }
                storage.set("soal_tersimpan",dnew);
                myApp.addNotification({
                  title: 'Data Ujiannya Sudah di Download',
                  message: 'Klik tombol reloadnnya ya buat memperbarui data, jangan lupa matiin internetnya juga ya'
                });
              }else {
                myApp.addNotification({
                  title: 'Data Ujiannya Gak Ketemu',
                  message: 'Coba reload lagi ya, mungkin data nya lagi jalan jalan '
                });
              }
            }else {
              myApp.addNotification({
                title: 'Kamu udah download ujian ini lohh ..',
                message: 'Coba inget inget kamu udah pernah download ini'
              });
            }
          }else {
            if (r.status == 1) {
              old = storage.get("soal_tersimpan");
              dnew = [];
              if (old != null) {
                dnew = old;
                dnew[id] = r.data[id];
              }else {
                dnew = r.data;
              }
              storage.set("soal_tersimpan",dnew);
              myApp.addNotification({
                title: 'Data Ujiannya Sudah di Download',
                message: 'Klik tombol reloadnnya ya buat memperbarui data, jangan lupa matiin internetnya juga ya'
              });
            }else {
              myApp.addNotification({
                title: 'Data Ujiannya Gak Ketemu',
                message: 'Coba reload lagi ya, mungkin data nya lagi jalan jalan '
              });
            }
          }
        }).fail(function(){
          myApp.addNotification({
            title: 'Sepertinya internet kamu mati',
            message: 'Tolong cek koneksinya ya'
          });
        })
      });
    }else {
      console.log("Internet Mati");
      myApp.addNotification({
        title: 'Internet Tidak Aktif',
        message: 'Internet kamu gak aktif, kalau mau unduh soal aktifkan dulu internetnya'
      });
      if (storage.get("soal_tersimpan") == null) {
        storage.set("soal_tersimpan",[]);
      }
      data = [];
      soallist = storage.get("soal_tersimpan");
      if (dtable != null) {
        dtable.destroy();
      }
      no = 1;
      i = 0;
      $.each(soallist,function(index, el) {
        buka = moment(el.buka).format("DD-MM-YYYY HH:mm:ss");
        tutup = moment(el.tutup).format("DD-MM-YYYY HH:mm:ss");
        if (el.ditutup == null) {
          tutup = "Tak Terbatas";
        }
        formatted = "("+buka+") -> ("+tutup+")";
        djawaban = storage.get("jawaban_soal");
        if (djawaban != null) {
          if (djawaban[index] != undefined) {
            data[i++] = [no++,el.matpel,formatted,el.waktu+" Menit",null,"<button class='button sync'  data-id='"+index+"'>Upload</button>"];
          }else {
            data[i++] = [no++,el.matpel,formatted,el.waktu+" Menit",null,"<button class='button kerjakan'  data-id='"+index+"'>Kerjakan</button>"];
          }
        }else {
          data[i++] = [no++,el.matpel,formatted,el.waktu+" Menit",null,"<button class='button kerjakan'  data-id='"+index+"'>Kerjakan</button>"];
        }
      });
      dtable = $("#dtable").DataTable({
        searching: false,
        ordering:false,
        bPaginate: false,
        bLengthChange: false,
        bFilter: true,
        bInfo: false,
        bAutoWidth: false,
        data:data,
        responsive: true,
      });
    }

  }
  $("#dtable").on('click', '.kerjakan', function(event) {
    event.preventDefault();
    console.log("Kerjakan");
    storage.set("pin_verifikasi",$(this).data("id"));
    myApp.popup(".popup-pin");
  });
  $("#pinForm").on('submit', function(event) {
    event.preventDefault();
    data_form = $(this).serializeArray();
    if (data_form[0].value != "") {
      data = storage.get("soal_tersimpan");
      id = storage.get("pin_verifikasi");
      pin = data[id].pin;
      if (pin == data_form[0].value) {
        myApp.addNotification({
          title: 'PIN Kamu Benar',
          message: 'Kerjakanlah Ujian Ini Dengan Jujur Ya '
        })
        myApp.closeModal();
        mainView.router.loadPage("ujian-form.html");
      }else {
        myApp.addNotification({
          title: 'Pin Nya Salah',
          message: 'Awas Typo, Coba Ulangi Lagi'
        });
      }
    }else {
      myApp.addNotification({
        title: 'Kamu belum input pin nya',
        message: 'Tanyakan kepada pengajarmu'
      });
    }
  });
  $("#dtable").on('click', '.sync', function(event) {
    event.preventDefault();
    id = $(this).data("id");
    jawaban = storage.get("jawaban_soal");
    sycItem = jawaban[id];
    console.log(sycItem);
    $.post(urlBuild("jawaban"),sycItem,function(rs){
      if (rs.status == 1) {
        myApp.addNotification({
          title: 'Sukses Upload',
          message: 'Kamu udah sukses upload data ke database sekolah yah !  '
        });
        dtable.ajax.reload();
      }else {
        myApp.addNotification({
          title: 'Gagal Upload',
          message: 'Kontak Bagian Admin  '
        });
      }
    }).fail(function(){
      myApp.addNotification({
        title: 'Gagal Upload',
        message: 'Coba deh cek internet mu, apakah jalan ?  '
      });
    })
  });
})
