from django.shortcuts import render

def index(request):
    return render(request, 'pages/home.html')

def explore(request):
    return render(request, 'pages/explore.html')

def bookInfo(request):
    return render (request, 'pages/book-info.html')

def bookPlace(request):
    return render (request, 'pages/book-place.html')

def bookPayment(request):
    return render (request, 'pages/book-payment.html')

def details(request):
    return render (request, 'pages/details.html')

# Create your views here.
