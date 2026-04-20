$enc = [System.Text.Encoding]::UTF8

# Root sayfalar - eski nav bloğu
$oldNav = '<a href="e-donusum.html" class="nav-link">e-D' + [char]0x00F6 + [char]0x006E + [char]0x00FC + [char]0x015F + [char]0x00FC + 'm</a>'
$oldOrtak = '<a href="is-ortaklari.html" class="nav-link">' + [char]0x0130 + [char]0x015F + ' Ortaklar' + [char]0x0131 + '</a>'
$oldBlog = '<a href="blog/index.html" class="nav-link">Blog</a>'
$newDestek = '<a href="destek.html" class="nav-link">Destek/' + [char]0x0130 + 'ndirme</a>'
$newBlog = '<a href="blog/index.html" class="nav-link">Haberler/Blog</a>'

$rootFiles = Get-ChildItem 'C:\claude\gun2\*.html'
foreach ($f in $rootFiles) {
    $c = [System.IO.File]::ReadAllText($f.FullName, $enc)
    $c = $c.Replace($oldNav, '')
    $c = $c.Replace($oldOrtak, '')
    $c = $c.Replace($oldBlog, $newDestek + "`n      " + $newBlog)
    [System.IO.File]::WriteAllText($f.FullName, $c, $enc)
    Write-Host ("Root: " + $f.Name)
}

# Blog sayfalar
$oldNavB = '<a href="../e-donusum.html" class="nav-link">e-D' + [char]0x00F6 + [char]0x006E + [char]0x00FC + [char]0x015F + [char]0x00FC + 'm</a>'
$oldOrtakB = '<a href="../is-ortaklari.html" class="nav-link">' + [char]0x0130 + [char]0x015F + ' Ortaklar' + [char]0x0131 + '</a>'
$oldBlogB = '<a href="index.html" class="nav-link">Blog</a>'
$newDestekB = '<a href="../destek.html" class="nav-link">Destek/' + [char]0x0130 + 'ndirme</a>'
$newBlogB = '<a href="index.html" class="nav-link">Haberler/Blog</a>'

$blogFiles = Get-ChildItem 'C:\claude\gun2\blog\*.html'
foreach ($f in $blogFiles) {
    $c = [System.IO.File]::ReadAllText($f.FullName, $enc)
    $c = $c.Replace($oldNavB, '')
    $c = $c.Replace($oldOrtakB, '')
    $c = $c.Replace($oldBlogB, $newDestekB + "`n      " + $newBlogB)
    [System.IO.File]::WriteAllText($f.FullName, $c, $enc)
    Write-Host ("Blog: " + $f.Name)
}

Write-Host "Tamamlandi"
